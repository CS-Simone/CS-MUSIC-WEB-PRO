const connectToDatabase = require('./db');

module.exports = async (req, res) => {
  const { gfs } = await connectToDatabase();

  const { id } = req.query; // GridFS file ID from request
  const readStream = gfs.createReadStream({ _id: id });

  readStream.on('error', () => res.status(404).send('File not found'));
  readStream.pipe(res);
};
