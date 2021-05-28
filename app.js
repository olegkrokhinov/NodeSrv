const express = require('express');
const app = express();
const mongoose = require('mongoose');

const uri = 'mongodb+srv://NodeSrvUser:mVaDEtZKO3SOJ5nl@cluster0.arqzx.mongodb.net/NodeSrvDB?retryWrites=true&w=majority';
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Headers", "access-control-allow-origin, content-type")
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

require('./appRoutes')(app);

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
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