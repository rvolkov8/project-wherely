const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('mongodb connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
