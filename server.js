'use strict';

const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join('public')));

const hangman = require('./routes/hangman');
const users = require('./routes/users');
app.use('/hangman', hangman);
app.use('/users', users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});