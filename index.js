
const express = require('express');
const cors = require('cors');
const signupRoutes = require('./src/routes/signupRoute');
const loginRoutes = require('./src/routes/loginRoute');
const userRoutes = require('./src/routes/userRoute');
const transferRoutes = require('./src/routes/transferRoute');
const transactionRoutes = require('./src/routes/getTransactions');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const MONGODB_URI = process.env.DB_URL;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(signupRoutes);
app.use(loginRoutes);
app.use(userRoutes);
app.use(transferRoutes);
app.use(transactionRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
