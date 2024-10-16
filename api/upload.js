const connectToDatabase = require('./db');
const Song = require('../models/SongModel');
const Album = require('../models/AlbumModel');
const { Readable } = require('stream');
const auth = require('./auth');

module.exports = async (req, res) => {
  const { gfs } = await connectToDatabase();
  
  if (req.method === 'POST') {
    auth(req, res, async () => {
      const { title, authors, albumId, releaseDate, length } = req.body;
      const songFile = req.files.songFile;

      const readStream = new Readable();
      readStream.push(songFile.buffer);
      readStream.push(null);

      const writeStream = gfs.createWriteStream({ filename: songFile.originalname });
      readStream.pipe(writeStream);

      writeStream.on('close', async (file) => {
        const album = await Album.findById(albumId);
        const newSong = new Song({ title, authors: authors.split(','), album: album.name, releaseDate: new Date(releaseDate), length, gridFSFileId: file._id });
        await newSong.save();
        res.status(200).json({ message: 'Song uploaded successfully!', song: newSong });
      });
    });
  } else if (req.method === 'GET') {
    const albums = await Album.find();
    res.status(200).json(albums);
  }
};
