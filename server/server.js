const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const { Socket } = require('socket.io-client')
const mongoose = require ('mongoose');
require('dotenv').config()
const { Room } = require('./models/models.js')
const path = require('path')
const bodyParser = require('body-parser')
const redis = require('./redis.js')

const password = 'hello'
const text = 'world'
redis.setText(password, text)
redis.getText(password)

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

//object which stores room_passwords and text documents
const roomPasswords = {}

//whenever a new client connects to the server...
io.on('connection', client => {
    console.log('a user connected');
    //when a client creates a room store room name and password in object
    client.on('create room', () => {
        //generate random password
        let randomPassword = autoGenerate();
        // let randomPassword = 'randomPassword';
        //store random password in object
        roomPasswords[randomPassword] = '';
        
        console.log(`room has been created with password: ${randomPassword}`);
        //send text 
        
        client.emit('get password', randomPassword)
    })
    
    //when a client joins a room
    client.on('join room', (password) => {
        
        console.log("in join room on server")
        console.log('PASSWORD in server:', password)
        console.log('object on server:', roomPasswords)
        
        //check if room password exists in the object
        if(password in roomPasswords){
            console.log("object found!")
            //client joins room
            client.join(password);
            console.log(`User joined room: ${password}`);
            //send text
            client.emit('document', password, roomPasswords[password])
        //if password cannot be found
        } else {
            client.emit('error', 'Could not find room')
            console.log('room not found')
        }
    })
    
    //listens for changes in the document and broadcasts them to all clients in the room
    //changeData will hold the enitre document with new changes
    client.on('document change', (password, updatedText) => {
        //store new data to object with that room key
        console.log('in document change on server ')
        console.log('password:',  password)
        console.log('updated text', updatedText)
        console.log('object in server before getting new text', roomPasswords)
        roomPasswords[password] = updatedText
        console.log('object in server after getting new text', roomPasswords)
        client.in(password).emit('get updates', roomPasswords[password])
    })
    //on disconnect
    io.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(PORT, () => console.log('listening on port:', PORT))
