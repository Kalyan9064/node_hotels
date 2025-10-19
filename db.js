const mongoose = require('mongoose');
require('dotenv').config();

// ✅ Choose which DB to use by commenting/uncommenting
 const mongoURL = process.env.MONGODB_URL_LOCAL;   // ⬅️ Use this for LOCAL MongoDB
//const mongoURL = process.env.MONGODB_URL_ATLAS;      // ⬅️ Use this for ATLAS (Cloud)

// Set up MongoDB connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get default connection
const db = mongoose.connection;

// Event listeners
db.on('connected', () => {
  console.log(`✅ Connected to MongoDB server: ${mongoURL.includes('127.0.0.1') ? 'LOCAL' : 'ATLAS'}`);
});

db.on('error', (err) => {
  console.error("❌ MongoDB server connection error:", err);
});

db.on('disconnected', () => {
  console.log("⚠️ MongoDB server disconnected");
});

module.exports = db;
