const express = require('express'); // Import Express framework
const app = express(); // Create an Express application
const port = 3000; // Default port for the server
const db = require('./db'); // Import database connection (MongoDB)
require('dotenv').config(); // Load environment variables from .env file
const passport = require('./auth'); // Import configured Passport for local authentication

const bodyParser = require('body-parser'); // Middleware to parse JSON request bodies
app.use(bodyParser.json()); // Apply JSON body parser middleware
const PORT = process.env.PORT || 3000; // Use environment port if available

// ==========================
// Middleware Function to log requests
// ==========================
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // Proceed to the next middleware or route handler
}
app.use(logRequest); // Apply the logging middleware to all routes

// ==========================
// Passport Initialization
// ==========================
app.use(passport.initialize()); // Initialize Passport middleware
const locaAuthMiddleware = passport.authenticate('local', { session: false }); 
// Note: This middleware can be used on routes where authentication is required

// ==========================
// Root Route
// ==========================
app.get('/', (req, res) => {
  res.send('Hello World!'); // Simple route to test server
});

// ==========================
// Admin Route
// ==========================
app.get('/admin', (req, res) => {
  res.send('Welome to admin panel...'); // Admin page (no auth applied here)
});

// ==========================
// Import Person Routes
// ==========================
const personRoutes = require('./routes/personRoutes'); // Import routes for /person
const Person = require('./models/person'); // Import Person model (for reference, optional here)

// ==========================
// Use the Person routes
// ==========================
app.use('/person', personRoutes); 
// All routes under /person will be handled by personRoutes.js
// Example: GET /person -> fetch all persons
// Example: POST /person/signup -> create a new person

// ==========================
// Start the Server
// ==========================
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Log server start
});
