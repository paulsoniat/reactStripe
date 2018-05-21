const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const db = require('./client/database/db.js');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const port = process.env.PORT || 5000;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {};

opts.jwtFromRequest = ExtractJwt.fromHeader('authorization'),
  opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  Users.findOne({
    username: jwt_payload.username
  }, (err, user) => {
    if (err) {
      return done(err, false);
    } else if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/createUser', function (req, res) {
  const tokenData = {
    email: req.body.email,
    password: req.body.password,
  };
  db.User.findOne({
      email: req.body.email
    })
    .then((results) => {
      if (results === null) {
        const user = new db.User(tokenData);
        user.save((err, createdUser) => {
          if (err) {
            console.error(err);
            res.status(400).send('there was an error creating the user');
          } else {
            tokenData._id = createdUser._id;
            const token = jwt.sign(tokenData, 'secret');
            res.status(201).send(token);
          }
        })
      } else {
        res.status(401).send('Sorry, a user with that name already exists');
      }
    })
})

app.post('/loginUser', function (req, res) {
  db.User.findOne({
      email: req.body.email
    })
    .then((user) => {
      if (user.password !== req.body.password) {
        res.send('Sorry, that password was incorrect');
      } else {
        const tokenData = {
          id: user._id,
          username: user.username,
        };
        const token = jwt.sign(tokenData, 'secret');
        res.status(201).send(token);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send(err);
    });

})




app.listen(port, () => console.log(`Listening on port ${port}`));
