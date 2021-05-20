const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./appRoutes')(app);

mongoose.connect('mongodb://localhost/NodeSrv', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(3000, function(){
  console.log(`Waiting for connections ...`);
});
});

process.on("SIGINT", () => {
  mongoose.disconnect(); 
  process.exit();
});