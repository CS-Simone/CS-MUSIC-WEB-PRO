const connectToDatabase = require('./db');
const Album = require('../models/AlbumModel');
const { Readable } = require('stream');

module.exports = async (req, res) => {
  const { gfs } = await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { name, releaseDate } = req.body;
      const coverFile = req.files.coverFile;

      if (!coverFile) {
        return res.status(400).json({ message: 'Cover image is required.' });
      }

      const readStream = new Readable();
      readStream.push(coverFile.buffer);
      readStream.push(null);

      const writeStream = gfs.createWriteStream({ filename: coverFile.originalname });

      readStream.pipe(writeStream);

      writeStream.on('close', async (file) => {
        try {
          const newAlbum = new Album({
            name,
            releaseDate: new Date(releaseDate),
            coverFileId: file._id,
          });
          await newAlbum.save();
          return res.status(200).json({ message: 'Album created!', album: newAlbum });
        } catch (error) {
          return res.status(500).json({ message: 'Error saving album.', error });
        }
      });

      writeStream.on('error', (error) => {
        return res.status(500).json({ message: 'Error uploading cover image.', error });
      });

    } catch (error) {
      return res.status(500).json({ message: 'Error processing request.', error });
    }

  } else if (req.method === 'GET') {
    try {
      const albums = await Album.find();
      const albumData = await Promise.all(albums.map(async (album) => {
        const coverStream = gfs.createReadStream({ _id: album.coverFileId });
        let coverBase64 = '';

        return new Promise((resolve, reject) => {
          coverStream.on('data', (chunk) => {
            coverBase64 += chunk.toString('base64');
          });

          coverStream.on('end', () => {
            resolve({
              _id: album._id, // Include album ID for referencing
              name: album.name,
              releaseDate: album.releaseDate,
              coverImage: `data:image/jpeg;base64,${coverBase64}`,
              songs: [], // Songs would be fetched in another route if necessary
            });
          });

          coverStream.on('error', (error) => {
            reject(error);
          });
        });
      }));

      return res.status(200).json(albumData);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving albums.', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
};
