'use strict';

const request = require('request');

describe('User scores', () => {
  it('should collect the score for all users', (done) => {
    request('http://localhost:3000/scoreboard', (err, res, body) => {
      if (err) {
        done(err);
      } else {
        const scores = JSON.parse(body);
        if (scores[0].score === 5 && scores[0].name === 'Aidan') {
          done();
        } else {
          done(new Error('Not correctly finding a users scores'));
        }
      }
    });
  });

  it('should include the score of new users', (done) => {
    request.post('http://localhost:3000/users', {
        form: {
          fullName: 'Score Test',
          emailAddress: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@test.com',
          passwordFirst: 'password',
          zipCode: '80309',
          snooze: 10,
          api: [1, 2, 3],
        }
      }, (err, res, body) => {
        request('http://localhost:3000/scoreboard', (err, res, body) => {
          if (err) {
            done(err);
          } else {
            const scores = JSON.parse(body);
            if (scores.some(s => s.name === 'Score Test')) {
              done();
            } else {
              done(new Error('New user score is not in the list'));
            }
          }
        })
      });
  });
});