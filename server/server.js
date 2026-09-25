const app = require('./src/app');
const connectDB = require('./src/config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  // Connect to MongoDB first
  await connectDB();

  // Then start listening for requests
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
