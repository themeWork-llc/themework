const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  password: { type: String, unique: true, required: true },
  text: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Room = mongoose.model('Room', roomSchema);

module.exports = {
  Room
}