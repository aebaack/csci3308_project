'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');

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
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hpass => {
      return knex('users')
        .insert({
          name,
          email,
          'hashed_password': hpass,
        })
        .returning(['id', 'name', 'email', 'created_at', 'updated_at'])
    })
    .then(user => {
      return res.redirect('index.html');
    })
});

module.exports = router;