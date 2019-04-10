'use strict';

exports.up = (knex, Promise) => {
  return knex.schema.createTable('api_ids', table => {
    table.increments();
    table.text('api_name').notNullable().unique();
  });
};

exports.down = (knex, Promise) => knex.schema.dropTable('api_ids');