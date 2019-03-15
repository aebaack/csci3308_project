'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const passport = require('../auth/local');

router.get('/:id', (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('users')
    .del(['id', 'name', 'email', 'created_at', 'updated_at'])
    .where('users.id', id)
    .then(user => res.send(user[0]))
  .catch(err => next(err));
});

module.exports = router;