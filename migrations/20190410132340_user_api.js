'use strict';

exports.up = (knex, Promise) => {
  return knex.schema.createTable('user_api', table => {
    table.increments();
    table.integer('user_id').references('id').inTable('users')
      .defaultTo(null).onDelete('CASCADE');;
    table.integer('api_id').references('id').inTable('api_ids')
      .defaultTo(null).onDelete('CASCADE');;
  });
}

exports.down = (knex, Promise) => knex.schema.dropTable('user_api');