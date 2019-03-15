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
          return res.redirect('./html/hangman.html');
        }
      })(req, res, next);
    })
});

// Log a user in
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
        res.status(200).send('Login successful');
      });
    }
  })(req, res, next);
})

router.get('/:id', isLoggedIn, (req, res, next) => {
  const id = req.params.id;

  knex('users')
    .select(['id', 'name', 'email', 'created_at', 'updated_at'])
    .where('users.id', id)
    .first()
    .then(user => {
      res.send(user);
    })
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('users')
    .del(['id', 'name', 'email', 'created_at', 'updated_at'])
    .where('users.id', id)
    .then(user => res.send(user[0]))
  .catch(err => next(err));
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/'); // Redirect to home page
}

module.exports = router;