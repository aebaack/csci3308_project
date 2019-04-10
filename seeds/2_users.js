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
        },
        {
          id: 2,
          name: 'Jake',
          email: 'jake@3308.com',
          hashed_password: hpass,
        },
        {
          id: 3,
          name: 'Nick',
          email: 'nick@3308.com',
          hashed_password: hpass,
        },
        {
          id: 4,
          name: 'Adam',
          email: 'adam@3308.com',
          hashed_password: hpass,
        },
        {
          id: 5,
          name: 'Yicheng',
          email: 'yicheng@3308.com',
          hashed_password: hpass,
        },
      ]);
    })
    .then(() => knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))"));
};
