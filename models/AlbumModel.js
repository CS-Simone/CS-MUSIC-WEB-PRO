const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  coverFileData: { type: Buffer, required: true }, // Store file as Buffer data
  coverFileType: { type: String, required: true }, // Store the file type for headers
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', AlbumSchema);
