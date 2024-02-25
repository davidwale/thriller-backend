const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUsername = await User.findOne({ $or: [{ username }] });

    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }


    const existingEmail = await User.findOne({ $or: [{ email }] });
    
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      username,
      email,
      password: hashedPassword, 
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'thriller', { expiresIn: '24h' });

    res.status(201).json({ message: 'User created successfully', token, username });
  } catch (error) {

      if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(500).json({ message: 'Error Signing up' });
  }
});

module.exports = router;
