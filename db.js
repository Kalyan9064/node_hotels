const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
//const mongoURL = process.env.MONGODB_URL_LOCAL //replace "myDatabase" with your database name
const mongoURL = process.env.MONGODB_URL;

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


//Commit added for testing purpouse (ignore)
