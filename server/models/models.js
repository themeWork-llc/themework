const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomName: { type: String, unique: true, required: true }, 
  password: { type: String, required: true },
  text: String,
  createdAt: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now }
})

const Room = mongoose.model('Room', roomSchema);

module.exports = {
  Room
}; 