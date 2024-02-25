const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const authenticateUser = require('../middleware/authMiddleware');

router.get('/api/transactions/:username', authenticateUser, async (req, res) => {
  const username = req.params.username;
  try {
    const transactions = await Transaction.find({ $or: [{ username: username }] });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error Getting Transactions' });
  }
});

module.exports = router;
