const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  counterparty: { type: String, required: true },
  points: { type: Number, required: true },
   charges: { type: Number, required: false },
  sender: { type: Boolean, required: true }, 
  date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;