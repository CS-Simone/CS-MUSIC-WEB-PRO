const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  coverFileId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.models.Album || mongoose.model('Album', AlbumSchema);
