'use strict';

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('api_ids').del()
    .then(() => {
      return knex('api_ids').insert([
        {
          id: 1,
          api_name: 'Google',
        },
        {
          id: 2,
          api_name: 'Quote',
        },
        {
          id: 3,
          api_name: 'NASA',
        },
        {
          id: 4,
          api_name: 'Reddit',
        },
        {
          id: 5,
          api_name: 'Weather',
        },
        {
          id: 6,
          api_name: 'Gif',
        },
      ]);
    })
    .then(() => knex.raw("SELECT setval('api_ids_id_seq', (SELECT MAX(id) FROM api_ids))"));
};
