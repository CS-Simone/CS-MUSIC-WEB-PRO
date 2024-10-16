module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json({ message: "Test" });
  }
};
 
