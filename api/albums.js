const Album = require('../models/AlbumModel');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, releaseDate } = req.body;
    const coverFile = req.files.coverFile;  // Assuming you're using multer to handle file uploads

    const newAlbum = new Album({
      name,
      releaseDate: new Date(releaseDate),
      coverFileData: coverFile.buffer,  // Store the file as Buffer
      coverFileType: coverFile.mimetype  // Store the file type for headers
    });

    await newAlbum.save();
    res.status(200).json({ message: 'Album created!', album: newAlbum });
  } else if (req.method === 'GET') {
    const albums = await Album.find();
    res.status(200).json(albums);
  }
};
