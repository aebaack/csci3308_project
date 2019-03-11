'use strict';

// Create hangman table
// ID
// Name: Text
// Email: Text
// Password: char(60)
// Timestamp

exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.text('name').notNullable();
    table.text('email').notNullable().unique();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex, Promise) => knex.schema.dropTable('users');
