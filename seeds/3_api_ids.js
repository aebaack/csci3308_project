'use strict';

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('api_ids').del()
    .then(() => {
      return knex('api_ids').insert([
        {
          id: 1,
          api_name: 'Weather',
        },
        {
          id: 2,
          api_name: 'Gifs',
        },
      ]);
    })
    .then(() => knex.raw("SELECT setval('api_ids_id_seq', (SELECT MAX(id) FROM api_ids))"));
};
