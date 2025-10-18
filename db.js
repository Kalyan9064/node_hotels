const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/mydatabase'; // use 127.0.0.1 for safety

// Set up MongoDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Mongoose maintains a default connection object
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', () => {
  console.log("✅ Connected to MongoDB server");
});

db.on('error', (err) => {
  console.error("❌ MongoDB server connection error:", err);
});

db.on('disconnected', () => {
  console.log("⚠️ MongoDB server disconnected");
});

// Export the database connection
module.exports = db;
