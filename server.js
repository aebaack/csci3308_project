'use strict';

const express = require('express');
const app = express();
const path = require('path');
const knex = require('./knex');

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join('public')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});