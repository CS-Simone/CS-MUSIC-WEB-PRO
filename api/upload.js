const Song = require('../models/SongModel');
const Album = require('../models/AlbumModel');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { title, authors, albumId, releaseDate, length } = req.body;
    const songFile = req.files.songFile;

    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    const newSong = new Song({
      title,
      authors: authors.split(','),
      album: album.name,
      releaseDate: new Date(releaseDate),
      length,
      songFileData: songFile.buffer,  // Store file as Buffer
      songFileType: songFile.mimetype  // Store file type
    });

    await newSong.save();
    res.status(200).json({ message: 'Song uploaded successfully!', song: newSong });
  }
};
