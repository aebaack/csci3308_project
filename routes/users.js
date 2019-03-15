'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const passport = require('../auth/local');

// Create a new user
router.post('/', (req, res, next) => {
  const { fullName, emailAddress, passwordFirst } = req.body;
  
  bcrypt.hash(passwordFirst, 10)
    .then(hpass => {
      return knex('users')
        .insert({
          'name': fullName,
          'email': emailAddress,
          'hashed_password': hpass,
        })
        .returning(['id', 'name', 'email', 'created_at', 'updated_at'])
    })
    .then(user => {
      passport.authenticate('local', (err, user, info) => {
        if (user) {
          req.logIn(user, (err) => {
            return res.redirect('/html/hangman.html');
          })
        }
      })(req, res, next);
    })
});

// Log a user in
// Returns user information
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(500).send('Server error');
    }
    if (!user) {
      res.status(404).send('No user found');
    }
    if (user) {
      req.logIn(user, (err) => {
        if (err) {
          res.status(500).send('Login error');
        }

        delete user.hashed_password;
        res.status(200).send(user);
      });
    }
  })(req, res, next);
})

// Log a user out
router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logOut();
  res.redirect('/');
});

// Returns the current user's information
router.get('/', isLoggedIn, (req, res, next) => {
  knex('users')
    .select(['id', 'name', 'email', 'created_at', 'updated_at'])
    .where('users.id', req.user.id)
    .first()
    .then(user => {
      res.send(user);
    })
    .catch(err => next(err));
});

// Deletes currently signed in user
// Returns the user information
router.delete('/', isLoggedIn, (req, res, next) => {
  knex('users')
    .del(['id', 'name', 'email', 'created_at', 'updated_at'])
    .where('users.email', req.user.email)
    .then(user => {
      req.logOut();
      res.send(user[0]);
    })
  .catch(err => next(err));
});

// Middleware for detecting if a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/'); // Redirect to home page
}

module.exports = router;