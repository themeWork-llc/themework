const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')
const { Socket } = require('socket.io-client')


const app = express()

const server = http.createServer(app)
const PORT = 3000

//on initial load send the html/react page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

//sets up a socket.io connection
const io = new Server(server)

//object which stores names of rooms and passwords for authentication
const roomPasswords = {}

//whenever a new client connects to the server...
io.on('connection', client => {
    console.log('a user connected');
    //when a client creates a room store room name and password in object
    io.on('create room', () => {
        roomPasswords[room] = {password, doc:''}
        console.log('room has been created');
    })
    //when a client joins a room
    client.on('join room', (room, password) => {
        if(roomPasswords[room] && roomPasswords.room.password === password){
            client.join(room);
            console.log(`User joined room: ${room}`);
        } else {
            Socket.emit('error joining room. try again')
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
    client.on('disconnect', () => {
        console.log('disconnect');
    });
});

server.listen(PORT, () => console.log('listening on port:', PORT))
