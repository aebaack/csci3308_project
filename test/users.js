'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const request = require('request');

describe('User routes', () => {
  const email = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@test.com';

  describe('Registration (Post /users)', () => {
    it('should create a new user if all required information is present', (done) => {
      request.post('http://localhost:3000/users', {
        form: {
          fullName: 'Test User',
          emailAddress: email,
          passwordFirst: 'password',
          zipCode: '80309',
          snooze: 10,
          api: [1, 2, 3],
        }
      }, (err, res, body) => {
        if (err) {
          done(err);
        } else {
          if (body.includes('Redirecting to /html/alarm.html')) {
            done();
          } else {
            done(new Error('Did not redirect to alarm'));
          }
        }
      });
    });
  });

  describe('Login (Post /users/login)', () => {
    it('should login a user with the correct information', (done) => {
      request.post('http://localhost:3000/users/login', {
        form: {
          'emailAddress': 'aidan@3308.com',
          'passwordFirst': 'password',
        }
      }, (err, res, body) => {
        if (err) {
          done(err);
        } else {
          if (body.includes('Redirecting to /html/alarm.html')) {
            done();
          } else {
            done(new Error('Did not log in user'));
          }
        }
      });
    });

    it('should not login a user with incorrect information', (done) => {
      request.post('http://localhost:3000/users/login', {
        form: {
          'emailAddress': 'aidan@3308.com',
          'passwordFirst': 'passwordd',
        }
      }, (err, res, body) => {
        if (err) {
          done(err);
        } else {
          if (body.includes('No user found')) {
            done();
          } else {
            done(new Error('Logged in user with incorrect credentials'));
          }
        }
      });
    });
  });

  describe('Log Out (Get /users/logout)', () => {
    it('should log out the currently logged in user', (done) => {
      request.post('http://localhost:3000/users/login', {
        form: {
          'emailAddress': 'aidan@3308.com',
          'passwordFirst': 'password',
        }
      }, (err, res, body) => {
        if (err) {
          done(err);
        } else {
          if (body.includes('Redirecting to /html/alarm.html')) {
            request.get('http://localhost:3000/users/logout', (err, res, body) => {
              if (err) {
                done(err);
              } else {
                if (body.includes('UpRight Registration')) {
                  done();
                } else {
                  done(new Error('Did not log out user'));
                }
              }
            });
          } else {
            done(new Error('Did not log in user'));
          }
        }
      });
    });
  });

  // Need to determine correct way to save cookies so that user is logged in during
  // future requests

  // describe('Update User Information (Post /users/update)', () => {
  //   before((done) => {
  //     request.post('http://localhost:3000/users/login', {
  //       form: {
  //         'emailAddress': 'aidan@3308.com',
  //         'passwordFirst': 'password',
  //       }
  //     }, (err, res, body) => {
  //       console.log('here');
  //       if (err) {
  //         done(err);
  //       } else {
  //         console.log('hereee');
  //         if (body.includes('Redirecting to /html/alarm.html')) {
  //           done();
  //         } else {
  //           done(new Error('Did not log in user'));
  //         }
  //       }
  //     });
  //   });

  //   it('should update user snooze time', (done) => {
  //     request.post('http://localhost:3000/users/update', {
  //       form: {
  //         'snooze': 10,
  //       }
  //     }, (err, res, body) => {
        
  //     });
  //   });
  // })

  describe('Other route functionality', () => {
    it('should not allow user information to be acquired without logging in', (done) => {
      request('http://localhost:3000/users', (err, res, body) => {
        if (err) {
          done(err);
        } else {
          if (body.includes('UpRight Registration')) {
            done();
          } else {
            done(new Error('Allowed user information to be requested without login'));
          }
        }
      });
    });
  });
});