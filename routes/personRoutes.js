// routes/personRoutes.js
const express = require('express');
const router = express.Router();
const Person = require('./../models/person'); // Import Mongoose model

// ==========================
// POST - Add a new person
// ==========================
router.post('/', async (req, res) => {
  try {
    const data = req.body; // req.body contains the person data

    const newPerson = new Person(data);
    const savedPerson = await newPerson.save(); // Save to MongoDB

    console.log('Data saved successfully');
    res.status(200).json(savedPerson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// GET - Fetch all persons
// ==========================
router.get('/', async (req, res) => {
  try {
    const people = await Person.find(); // Fetch all records
    console.log('All persons fetched');
    res.status(200).json(people);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================
// GET - Fetch persons by work type
// ==========================
router.get('/:worktype', async (req, res) => {
  try {
    const worktype = req.params.worktype;

    if (['chef', 'waiter', 'manager'].includes(worktype)) {
      const response = await Person.find({ work: worktype });
      console.log('Response fetched for work type:', worktype);
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid work type' });
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
    const personId = req.params.id;      // Extract ID from URL
    const updatePersonData = req.body;   // Data to update

    const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
      new: true,          // Return updated document
      runValidators: true // Run mongoose validation
    });

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Data updated for ID:', personId);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async(req, res) => {
    try{
        const personId = req.params.id;      // Extract ID from URL
        const response = await Person.findByIdAndDelete(personId);
        if( !response){
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data deleted');
        res.status(200).json({message: 'person Deleted sucessfully'});

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})











module.exports = router;
