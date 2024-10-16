const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  coverFileUrl: { type: String, required: true },  // Store the cover image URL here
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', AlbumSchema);
