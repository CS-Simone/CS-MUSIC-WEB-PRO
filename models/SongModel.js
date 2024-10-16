const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  album: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  length: { type: Number, required: true },  // Length in seconds
  songFileUrl: { type: String, required: true },  // Store the song file URL here
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Song', SongSchema);
