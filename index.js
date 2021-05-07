const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./userRouter')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', usersRouter);    
app.use((req, res, next) => {
    res.send(`The route ${req.path} can't be found`);
  });

mongoose.connect('mongodb://localhost/NodeSrv', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(3004, function(){
  console.log(`Waiting for connections ...`);
});
});

process.on("SIGINT", () => {
  mongoose.disconnect(); 
  process.exit();
});