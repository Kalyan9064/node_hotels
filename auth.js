const Person = require('./models/person'); // Import the Person Mongoose model
const passport = require('passport'); // Import Passport library
const LocalStrategy = require('passport-local').Strategy; // Import local strategy
const person = require('./models/person'); // Duplicate import (not used, but kept as original)

// Configure Passport to use LocalStrategy for authentication
passport.use(new LocalStrategy(async (USERNAME, passport, done) => {
  // This function is called whenever someone tries to authenticate

  try {
    // Find the user by username in MongoDB
    const user = await Person.findOne({username: USERNAME});
    
    // If no user found, authentication fails
    if(!user){
      return done(null, false, { message: 'Incorrect username.' });
    }

    // Check if password matches
    const isPasswordMatch = user.passport === passport ? true : false;
    
    if(isPasswordMatch){
      // If password matches, authentication succeeds
      return done(null, user);
    } else {
      // If password doesn't match, authentication fails
      return done(null, false, { message: 'Incorrect password.' });
    }
  } catch(err) {
    // If any error occurs during DB query, pass it to Passport
    return done(err);
  }
}));

// Export configured passport object
module.exports = passport;
