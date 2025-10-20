const express = require('express');
const router = express.Router(); // Create a new router object
const Person = require('./../models/person'); // Import Mongoose model for Person
const { jwtAuthMiddleware, generateToken } = require('./../jwt'); // Import JWT functions


// ==========================
// POST - Add a new person (Sign up)
// ==========================
router.post('/signup', async (req, res) => {
  try {
    const data = req.body; // Get user input from request body

    // Create a new Person document using the provided data
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save(); // Save to MongoDB
    console.log('Data saved successfully');

    // Generate JWT token for the new user
    const token = generateToken(savedPerson.username);
    console.log("Token is : ", token);

    // Send the saved person and token as JSON response
    res.status(200).json({response: savedPerson, token: token});
  } catch (err) {
    console.error(err);
    // Return 500 Internal Server Error if something goes wrong
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// GET - Fetch all persons (Protected route)
// ==========================
router.get('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const people = await Person.find(); // Fetch all person records from MongoDB
    console.log('All persons fetched');
    res.status(200).json(people); // Send data as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// GET - Fetch persons by work type (chef/waiter/manager)
// ==========================
router.get('/:worktype', async (req, res) => {
  try {
    const worktype = req.params.worktype; // Get work type from URL parameter

    // Only allow valid work types
    if (['chef', 'waiter', 'manager'].includes(worktype)) {
      const response = await Person.find({ work: worktype }); // Filter by work type
      console.log('Response fetched for work type:', worktype);
      res.status(200).json(response); // Send filtered data
    } else {
      res.status(404).json({ error: 'Invalid work type' }); // Invalid work type
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// PUT - Update a person by ID
// ==========================
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;      // Extract person ID from URL
    const updatePersonData = req.body;   // Get updated data from request body

    // Update the document in MongoDB and return the updated document
    const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
      new: true,          // Return the updated document
      runValidators: true // Apply schema validations
    });

    if (!response) {
      return res.status(404).json({ error: 'Person not found' }); // If no document found
    }

    console.log('Data updated for ID:', personId);
    res.status(200).json(response); // Return updated data
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// DELETE - Remove a person by ID
// ==========================
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract ID from URL
    const response = await Person.findByIdAndDelete(personId); // Delete document from MongoDB

    if (!response) {
      return res.status(404).json({ error: 'Person not found' }); // If no document found
    }

    console.log('data deleted');
    res.status(200).json({message: 'person Deleted successfully'}); // Return success message
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// Export the router so it can be used in server.js
module.exports = router;
