'use strict';

const fs = require('fs');

exports.seed = (knex, Promise) => {
  return knex('hangman').del()
    .then(() => {
      const puzzles = fs.readFileSync('./puzzles/HangmanData.csv', 'UTF8');

      const seeds = [] // Store commands to knex
      const valid = RegExp('^[a-zA-Z0-9$@$!%*?&#^-_. +,\'"]+$'); // Valid regex
      let counter = 1; // Keep counter outside of forEach because index might be skipped
      
      // Turn CSV values into array of knex inserts
      puzzles.split('\n').slice(1).forEach((p, i) => {
        const values = p.split(',');
        if (valid.test(values[0]) && valid.test(values[1])) { // Valid puzzle and category
          seeds.push(
            knex('hangman').insert({
              id: counter++,
              category: values[0],
              puzzle: values[1]
            })
          );
        }
      });

      return Promise.all(seeds);
    })
    .then(() => knex.raw("SELECT setval('hangman_id_seq', (SELECT MAX(id) FROM hangman))"));
};