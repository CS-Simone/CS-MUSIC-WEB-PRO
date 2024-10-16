module.exports = (req, res) => {
  if (req.session && req.session.loggedIn) {
    res.status(200).json({ loggedIn: true });
  } else {
    res.status(401).json({ loggedIn: false });
  }
};
