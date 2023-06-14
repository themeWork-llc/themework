const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const { Socket } = require('socket.io-client')
const mongoose = require ('mongoose');
require('dotenv').config()
const { Room } = require('./models/models.js')
const path = require('path')
const bodyParser = require('body-parser')


const cors = require('cors');
const app = express();

//create server
const server = http.createServer(app)

const PORT = 3000

//connect to mongoDB 
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to Mongo DB.'))
.catch((err) => console.log(err));

app.use(express.json())
//on initial load send the html/react page

// app.use(bodyParser.json())
// need CORS for connection
app.use(cors());

// test route to create a room in the database - sun jin
// app.post('/rooms', async (req, res) => {
//     try {
//       const { password, text } = req.body;
//       const room = new Room({ password, text });
//       await room.save();
//       res.status(201).json(room);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to create room' });
//     }
//   });


//sets up a socket.io connection
const io = new Server(server, {
    cors: {
        origin: "*"
      }
});

//declare a function that generates a random password of 8 letters and returns it
const autoGenerate = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      const randomLetter = letters.charAt(randomIndex);
      randomString += randomLetter;
    }
    return randomString;
  }

//object which stores names of rooms and passwords for authentication
const roomPasswords = {}

//whenever a new client connects to the server...
io.on('connection', client => {
    console.log('a user connected');
    //when a client creates a room store room name and password in object
    client.on('create room', () => {
        //generate random password
        let randomPassword = autoGenerate();
        //store random password in object
        roomPasswords.randomPassword = '';
        console.log(`room has been created with password: ${randomPassword}`);
        //send text 
        client.emit('get text', randomPassword, roomPasswords.randomPassword)
    })
    
    //when a client joins a room
    client.on('join room', (obj) => {
        const key = obj.password
        //check if room password exists in the object
        if(roomPasswords[key]){
            //client joins room
            client.join(key);
            console.log(`User joined room: ${key}`);
            //send text
            client.emit('document', roomPasswords[key])
        //if password cannot be found
        } else {
            client.emit('error', 'Could not find room')
        }
    })
    
    //listens for changes in the document and broadcasts them to all clients in the room
    //changeData will hold the enitre document with new changes
    client.on('document change', (password, changeData) => {
        //store new data to object with that room key
        roomPasswords[password].text = changeData
        client.to(password).emit(changeData)
    })
    //on disconnect
    io.on('disconnect', () => {
        console.log('disconnect');
    });
});

server.listen(PORT, () => console.log('listening on port:', PORT))
