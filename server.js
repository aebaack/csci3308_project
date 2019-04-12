'use strict';

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // allow http
}));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join('public')));

const hangman = require('./routes/hangman');
const users = require('./routes/users');
const scoreboard = require('./routes/score');

app.use('/scoreboard', scoreboard);
app.use('/hangman', hangman);
app.use('/users', users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});