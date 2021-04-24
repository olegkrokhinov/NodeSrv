const express = require('express');
const app = express();
const users = require('./users')

const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });
let dbClient;


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use('/users', users);    

app.use(function (req, res, next) {
    res.send(`The route ${req.path} can't be found`);
  });


mongoClient.connect(function(err, client){
  if(err) return console.log(err);
  dbClient = client;
  app.locals.db = client.db("NodeSrv");
  app.listen(3000, function(){
    console.log(`Waiting for connections ...`);
  });
});

process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});