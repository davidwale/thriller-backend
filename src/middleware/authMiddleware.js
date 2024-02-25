const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'thriller');
    req.user = await User.findById(decoded.userId); 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticateUser;
