const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const db = require('./client/database/db.js');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/handleNewUser', function (req, res) {
  console.log(req.body, "this is body")
  if (!req.body.email || !req.body.password) {
    res.send("must enter a valid email and password")
  } else {
    var statusCode = 201
    const newUser = new db.User({
      email: req.body.email,
      password: req.body.password
    })
    newUser.save((err) => {
      if (err) {
        return console.error(err)
      }
    });
    res.send(statusCode, req.body)
  }
})

app.post('/handleExistingUser', function (req, res) {
  console.log(req.body, "this is body")
  if (!req.body) {
    return res.sendStatus(400)
  } else {
    var statusCode = 201
    const newUser = new db.User({
      username: req.body.username
    })
    newUser.save((err) => {
      if (err) {
        return console.error(err)
      }
    });
    res.send(statusCode, req.body)
  }
})




app.listen(port, () => console.log(`Listening on port ${port}`));
