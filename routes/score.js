'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  // Insert request to get score
  knex('users')
  .select(['id','name','score'])
  .then(rank=>{
  res.send(rank);
})
.catch(err => next(err));
})

module.exports = router;
