const connectToDatabase = require('./db');
const mongoose = require('mongoose');
const { Readable } = require('stream');

const Album = mongoose.models.Album || mongoose.model('Album', new mongoose.Schema({
  name: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  coverFileId: { type: mongoose.Schema.Types.ObjectId, required: true }
}));

module.exports = async (req, res) => {
  const { gfs } = await connectToDatabase();

  if (req.method === 'POST') {
    const { name, releaseDate } = req.body;
    const coverFile = req.files.coverFile;

    const readStream = new Readable();
    readStream.push(coverFile.buffer);
    readStream.push(null);

    const writeStream = gfs.createWriteStream({ filename: coverFile.originalname });
    readStream.pipe(writeStream);

    writeStream.on('close', async (file) => {
      const newAlbum = new Album({ name, releaseDate: new Date(releaseDate), coverFileId: file._id });
      await newAlbum.save();
      res.status(200).json({ message: 'Album created!', album: newAlbum });
    });
  } else if (req.method === 'GET') {
    const albums = await Album.find();
    const albumData = await Promise.all(albums.map(async (album) => {
      const coverStream = gfs.createReadStream({ _id: album.coverFileId });
      let coverBase64 = '';

      coverStream.on('data', (chunk) => { coverBase64 += chunk.toString('base64'); });
      
      return new Promise((resolve) => {
        coverStream.on('end', () => resolve({
          name: album.name,
          releaseDate: album.releaseDate,
          coverImage: `data:image/jpeg;base64,${coverBase64}`,
          songs: [] // Songs fetched later
        }));
      });
    }));
    res.status(200).json(albumData);
  }
};
