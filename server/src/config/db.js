const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // mongoose.connect() returns a promise
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
