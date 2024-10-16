const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

async function connectToDatabase() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
  }
  return { gfs };
}

module.exports = connectToDatabase;
