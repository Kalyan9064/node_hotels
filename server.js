const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser'); //req.body
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/admin', (req, res) => {
  res.send('Welome to admin panel...')
})


//Import the router file
const personRoutes = require('./routes/personRoutes');

//Use the routers
app.use('/person',personRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
