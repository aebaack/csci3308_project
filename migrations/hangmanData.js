'use strict';

// Create hangman table
// ID
// Category: Text
// Puzzle: Text
exports.up = (knex, Promise) => {
  return knex.schema.createTable('hangman', table => {
    table.increments();
    table.text('category').notNullable();
    table.text('puzzle').notNullable();
  });
}

// Delete the hangman table
exports.down = (knex, Promise) => knex.schema.dropTable('hangman');