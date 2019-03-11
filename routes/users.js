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

module.exports = router;