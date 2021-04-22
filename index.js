const expless = require('express');
const app = expless();
const users = require('./users')

app.use('/users', users);    

app.use(function (req, res, next) {
    res.send(`The route ${req.path} can't be found`);
  });

app.listen(3000, () => {
    console.log(`Waiting for connections ...`)
  })


