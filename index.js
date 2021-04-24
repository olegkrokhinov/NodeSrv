const express = require('express');
const app = express();
const users = require('./users')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use('/users', users);    

app.use(function (req, res, next) {
    res.send(`The route ${req.path} can't be found`);
  });

app.listen(3000, () => {
    console.log(`Waiting for connections ...`)
  })


