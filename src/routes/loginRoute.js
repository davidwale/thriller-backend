const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    

  try {

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, 'thriller', { expiresIn: '24h' });

    res.status(200).json({ message: 'Login successful', token, username });
  } catch (error) {
    res.status(500).json({ message: 'Error Logging In' });
  }
});

module.exports = router;
