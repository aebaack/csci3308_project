'use strict';

exports.seed = (knex, Promise) => {
  return knex('hangman').del()
    .then(() => {
      return Promise.all([
        knex('hangman').insert({
          id: 1,
          category: 'Phrase',
          puzzle: 'YOU ONLY LIVE ONCE',
        }),
        knex('hangman').insert({
          id: 2,
          category: 'Person',
          puzzle: 'GEORGE C SCOTT',
        }),
      ]);
    })
    .then(() => knex.raw("SELECT setval('hangman_id_seq', (SELECT MAX(id) FROM hangman))"));
};