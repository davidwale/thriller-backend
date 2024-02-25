const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const User = require('../models/user');

router.get('/api/user', authenticateUser, (req, res) => {

  const { username, email, balance } = req.user;

  res.status(200).json({ username, email, balance });
});

module.exports = router;
