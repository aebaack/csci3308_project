'use strict';

const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join('public')));

const hangman = require('./routes/hangman')
app.use('/hangman', hangman);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});