const mongoose = require('mongoose'); // Import Mongoose for MongoDB
const passport = require('passport'); // Import Passport (for authentication, not used directly here)

// ==========================
// Define the person schema
// ==========================
const personSchema = new mongoose.Schema({
    // Name of the person, required
    name: {
        type: String,
        required: true
    },

    // Age of the person, optional
    age: {
        type: Number
    },

    // Work role, must be one of the specified values, required
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'], // Allowed values
        required: true
    },

    // Mobile number, required
    mobile: {
        type: String,
        required: true
    },

    // Email address, required and unique across all documents
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Address of the person, optional
    address: {
        type: String,
    },

    // Salary, required
    salary: {
        type: Number,
        required: true
    },

    // Username for login, required
    username: {
        required: true,
        type: String,
    },

    // Password for login, required
    passport: {
        required: true,
        type: String,
    }
});

// ==========================
// Create a Mongoose model named "Person" using the schema
// The model provides an interface to interact with the "people" collection in MongoDB
// ==========================
const Person = mongoose.model('Person', personSchema);

// Export the model so it can be used in other files (e.g., routes, authentication)
module.exports = Person;
