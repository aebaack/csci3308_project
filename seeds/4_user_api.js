'use strict';

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('user_api').del()
    .then(() => {
      return knex('user_api').insert([
        {
          id: 1,
          user_id: 1,
          api_id: 1,
        },
        {
          id: 2,
          user_id: 1,
          api_id: 2,
        },
      ]);
    })
    .then(() => knex.raw("SELECT setval('user_api_id_seq', (SELECT MAX(id) FROM user_api))"));
};
