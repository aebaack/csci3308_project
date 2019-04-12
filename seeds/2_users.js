'use strict';

const bcrypt = require('bcrypt');

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => bcrypt.hash('password', 10))
    .then((hpass) => {
      console.log(hpass);
      return knex('users').insert([
        {
          id: 1,
          name: 'Aidan',
          email: 'aidan@3308.com',
          hashed_password: hpass,
          snooze: 5,
          score: 5,
          zip_code: '80309',
        },
        {
          id: 2,
          name: 'Jake',
          email: 'jake@3308.com',
          hashed_password: hpass,
          snooze: 10,
          score: 10,
          zip_code: '80309',
        },
        {
          id: 3,
          name: 'Nick',
          email: 'nick@3308.com',
          hashed_password: hpass,
          snooze: 15,
          score: 15,
          zip_code: '80309',
        },
        {
          id: 4,
          name: 'Adam',
          email: 'adam@3308.com',
          hashed_password: hpass,
          snooze: 20,
          score: 20,
          zip_code: '80309',
        },
        {
          id: 5,
          name: 'Yicheng',
          email: 'yicheng@3308.com',
          hashed_password: hpass,
          snooze: 25,
          score: 25,
          zip_code: '80309',
        },
      ]);
    })
    .then(() => knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))"));
};
