const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { port, dbUri } = require('./appConfig')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./appRoutes')(app);

mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  app.listen(port, function(){
    console.log(`Waiting for connections at port ${port}...`);
  });
})
.catch(error=> console.log(`Error: `+ error));

process.on("SIGINT", () => {
  mongoose.disconnect(); 
  process.exit();
})