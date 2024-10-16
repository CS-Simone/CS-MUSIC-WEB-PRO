const session = require('express-session');
const connectToDatabase = require('./db');

const express = require('express');
const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.loggedIn = true;
    res.status(200).json({ message: 'Logged in successfully!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = app;
