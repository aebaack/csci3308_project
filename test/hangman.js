'use strict';

const request = require('request');

describe('Hangman Puzzles', () => {
  it('should return a hangman puzzle', (done) => {
    request('http://localhost:3000/hangman', (err, res, body) => {
      if (err) {
        done(err);
      } else {
        const puzzle = JSON.parse(body);
        if (puzzle.puzzle && puzzle.category) {
          done();
        } else {
          done(new Error('Hangman puzzle is incorrect'));
        }
      }
    });
  });

  it('should return a random hangman puzzle', (done) => {
    request('http://localhost:3000/hangman', (err, res, body1) => {
      if (err) {
        done(err);
      } else {
        request('http://localhost:3000/hangman', (err, res, body2) => {
          const firstPuzzle = JSON.parse(body1);
          const secondPuzzle = JSON.parse(body2);
          if (firstPuzzle.puzzle === secondPuzzle.puzzle) {
            done(new Error('Puzzles are identical'));
          } else {
            done();
          }
        });
      }
    });
  });
})