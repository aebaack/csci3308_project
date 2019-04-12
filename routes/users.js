'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const passport = require('../auth/local');

// Create a new user
router.post('/', (req, res, next) => {
  const { 
    fullName, 
    emailAddress, 
    passwordFirst, 
    zipCode, 
    snooze,
    api
  } = req.body;

  bcrypt.hash(passwordFirst, 10)
    .then(hpass => {
      return knex('users')
        .insert({
          'name': fullName,
          'email': emailAddress,
          'zip_code': zipCode,
          'hashed_password': hpass,
          snooze,
        })
        .returning(['id', 'name', 'email', 'created_at', 'updated_at', 'snooze', 'zip_code'])
    })
    .then(user => {
      let apiF; // Default form submission is garbage
      if (api) {
        if (typeof api == 'object') {
          apiF = api;
        } else {
          apiF = [api];
        }
      } else {
        apiF = [];
      }

      Promise.all(apiF.map(a => 
        knex('user_api')
          .insert({
            'user_id': user[0].id,
            'api_id': a,
          }, '*')
      )).then(apis => {
        Promise.all((apis || []).map(l => {
          return knex('api_ids')
            .select('api_name')
            .where('api_ids.id', l[0].api_id)
        }))
        .then(names => {
          user.api = names.map(n => n[0].api_name);
          
          passport.authenticate('local', (err, user, info) => {
            if (user) {
              req.logIn(user, (err) => {
                return res.redirect('/html/hangman.html');
              })
            }
          })(req, res, next);
        });
      })
    })
});

// Log a user in
// Returns user information
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      res.status(500).send('Server error');
    }
    if (!user) {
      res.status(404).send('No user found');
    }
    if (user) {
      req.logIn(user, (err) => {
        if (err) {
          res.status(500).send('Login error');
        }

        delete user.hashed_password;
        res.status(200).send(user);
      });
    }
  })(req, res, next);
})

// Log a user out
router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logOut();
  res.redirect('/');
});

// Returns the current user's information
router.get('/', isLoggedIn, (req, res, next) => {
  knex('users')
    .select(['id', 'name', 'email', 'snooze', 'created_at', 'updated_at', 'score', 'zip_code'])
    .where('users.id', req.user.id)
    .first()
    .then(user => {
      knex('user_api')
        .where('user_api.user_id', user.id)
        .join('api_ids', 'user_api.api_id', '=', 'api_ids.id')
        .then(api => {
          user.api = api.map(a => a.api_name);
          res.send(user);
        })
    })
    .catch(err => next(err));
});

router.post('/score', isLoggedIn, (req, res, next) => {
  const { score } = req.body;

  knex('users')
    .where('users.id', req.user.id)
    .update({
      score,
    }, '*')
    .then(u => {
      res.status(200).send(`Score updated to ${score}`);
    })
})

router.post('/update', isLoggedIn, (req, res, next) => {
  const promises = []

  if (req.body.api.length > 0) {
    promises.push(
      knex('user_api')
        .del()
        .where('user_api.user_id', req.user.id)
        .then(delApi => {
          const p = req.body.api.map(a => {
            return knex('user_api')
              .insert({
                user_id: req.user.id,
                api_id: parseInt(a),
              })
          })
          return Promise.all(p);
        })
        .then(_ => true)
        .catch(err => next(err))
    );
  }


  if (req.body.passwordThird) {
    promises.push(
      knex('users')
        .where('users.id', req.user.id)
        .first()
        .then(user => {
          if (!user) {
            return res.status(404).send('No user found');
          }

          bcrypt.compare(req.body.passwordFirst, user.hashed_password)
            .then(isSame => {
              if (isSame) {
                bcrypt.hash(req.body.passwordThird, 10)
                  .then(newpass => {
                    knex('users')
                      .where('users.id', req.user.id)
                      .update({
                        snooze: parseInt(req.body.snooze),
                        hashed_password: newpass,
                      }, '*')
                      .then(u => {
                        knex('user_api')
                          .where('user_api.user_id', u[0].id)
                          .join('api_ids', 'user_api.api_id', '=', 'api_ids.id')
                          .then(api => {
                            u[0].api = api.map(a => a.api_name);
                            delete u[0].hashed_password;
                            return true;
                          })
                      })
                  })
              } else {
                return res.status(500).send('Wrong password');
              }
            })
        })
    )
  }

  if (req.body.snooze) {
    promises.push(
      knex('users')
        .where('users.id', req.user.id)
        .update({snooze: parseInt(req.body.snooze)}, '*')
        .then(u => {
          return true;
        })
    );
  }

  Promise.all(promises)
    .then(v => {
      res.redirect('/users');
    });
});

// Deletes currently signed in user
// Returns the user information
router.delete('/', isLoggedIn, (req, res, next) => {
  knex('users')
    .del(['id', 'name', 'email', 'created_at', 'updated_at', 'snooze', 'score', 'zip_code'])
    .where('users.email', req.user.email)
    .then(user => {
      req.logOut();
      res.send(user[0]);
    })
  .catch(err => next(err));
});

// Middleware for detecting if a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/'); // Redirect to home page
}

module.exports = router;