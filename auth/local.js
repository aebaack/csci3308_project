const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');
const init = require('./passport');
const knex = require('../knex');

const options = {
  usernameField: 'emailAddress',
  passwordField: 'passwordFirst',
};

init();

passport.use(new LocalStrategy(options, (email, password, done) => {
  knex('users')
    .where('users.email', email)
    .first()
    .then(user => {
      knex('user_api')
        .where('user_api.user_id', user.id)
        .join('api_ids', 'user_api.api_id', '=', 'api_ids.id')
        .then(api => {
          if (!user) {
            return done(null, false, {message: 'User not found'});
          }

          user.api = api.map(a => a.api_name);
          
          bcrypt.compare(password, user.hashed_password)
            .then(isSame => isSame ? done(null, user) : done(null, false, {message: 'Wrong password'}))
          })
        })
    .catch(err => done(err));
}));

module.exports = passport;