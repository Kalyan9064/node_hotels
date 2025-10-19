const Person = require('./models/person');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person');



passport.use(new LocalStrategy(async (USERNAME, passport, done) => {
  //Authentication logic here

  try{
    //console.log('Received credintials:',USERNAME,passport);
    const user = await Person.findOne({username: USERNAME});
    if(!user){
      return done(null, false, { message: 'Incorrect username.'});
    }

    const isPasswordMatch = user.passport === passport ? true : false;
    if(isPasswordMatch){
      return done(null, user);
    }else{
      return done(null, false, { message: 'Incorrect password.' });
    }
  }catch(err){
    return done(err);
  }
}));

module.exports = passport;  //Export configured passport