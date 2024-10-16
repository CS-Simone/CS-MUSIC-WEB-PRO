const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  releaseDate: { type: Date, required: true },
  length: { type: Number, required: true },
  album: { type: String, required: true },
  gridFSFileId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.models.Song || mongoose.model('Song', SongSchema);
