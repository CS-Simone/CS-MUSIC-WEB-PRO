const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  coverFileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Album model from the schema
const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
