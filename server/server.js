const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const { Socket } = require('socket.io-client')
const mongoose = require ('mongoose');
require('dotenv').config()
const { Room } = require('./models/models.js')


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

// need CORS for connection
app.use(cors());

// NOTE: for this link to work, I think it would have to be a static file - Hank
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})



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
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
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
        client.emit('get text', roomPasswords.randomPassword)
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
    
    //listnens for changes in the document and broadcasts them to all clients in the room
    //changeData will hold the enitre document with new changes
    client.on('document change', (room, changeData) => {
        //store new data to object with that room key
        roomPasswords[room].doc = changeData
        client.to(room).emit(changeData)
    })
    //on disconnect
    io.on('disconnect', () => {
        console.log('disconnect');
    });
});

server.listen(PORT, () => console.log('listening on port:', PORT))
