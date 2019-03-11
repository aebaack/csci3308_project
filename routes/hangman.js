'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex('hangman')
    .count()
    .then(count => {
      const id = Math.floor(Math.random() * count[0].count) + 1
      
      knex('hangman')
        .select(['puzzle', 'category'])
        .where('hangman.id', id)
        .first()
        .then(puzzle => res.send(puzzle));
    })
    .catch(err => next(err));
});

module.exports = router;