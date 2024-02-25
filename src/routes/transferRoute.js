const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Transaction = require('../models/transaction');
const authenticateUser = require('../middleware/authMiddleware');

router.post('/api/sendpoints', authenticateUser, async (req, res) => {
  const { senderUsername, recipientUsername } = req.body;
  const points = parseInt(req.body.points);

  try {
    const sender = await User.findOne({ username: senderUsername });
    const recipient = await User.findOne({ username: recipientUsername });

    if (!sender) {
      return res.status(400).json({ message: 'Login to send points' });
      }
      if (!recipient) {
      return res.status(400).json({ message: 'recipient not found' });
    }

    if (senderUsername === recipientUsername) {
      return res.status(400).json({ message: 'You cannot send points to yourself' });
    }

    const charges = calculateCharges(points);

    const totalPointsToSend = points + charges;
    if (sender.balance < totalPointsToSend) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

      sender.balance -= totalPointsToSend;

      recipient.balance += points;

      const senderTransaction = new Transaction({
        username: sender.username,
        counterparty: recipient.username,
        points: -points,  
        charges: charges,
        sender: true
        });
        const recipientTransaction = new Transaction({
        username: recipient.username,
        counterparty: sender.username,
        points: points,  
        sender: false
        });
        await senderTransaction.save();
        await recipientTransaction.save();
      
    await sender.save();
    await recipient.save();

    const newBalance = sender.balance;

    res.status(200).json({ message: `Points sent successfully your new balance is ${newBalance}` });
  } catch (error) {
    res.status(500).json({ message: 'Error sending points' });
  }
});

function calculateCharges(points) {
  return Math.floor(points / 100);
}

module.exports = router;
