const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser'); //req.body
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
}


app.use(logRequest);

app.use(passport.initialize());
const locaAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/',(req, res) => {
  res.send('Hello World!')
})

app.get('/admin', (req, res) => {
  res.send('Welome to admin panel...')
})


//Import the router file
const personRoutes = require('./routes/personRoutes');
const Person = require('./models/person');

//Use the routers
app.use('/person',locaAuthMiddleware, personRoutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})