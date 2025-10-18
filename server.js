const express = require('express')
const app = express()
const port = 3000
const db = require('./db');

const bodyParser = require('body-parser'); //req.body
app.use(bodyParser.json());

const Person = require('./models/person');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/admin', (req, res) => {
  res.send('Welome to admin panel...')
})

//POST route to add a person
app.post('/person', async (req, res) => {
  try {
    const data = req.body; // req.body contains the person data

    const newPerson = new Person(data);

    const savedPerson = await newPerson.save(); // ✅ actually saves to MongoDB
    console.log('Data saved successfully');
    res.status(200).json(savedPerson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
