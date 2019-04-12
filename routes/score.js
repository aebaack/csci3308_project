'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  // Insert request to get score
  res.send('Scoreboard');
})

module.exports = router;