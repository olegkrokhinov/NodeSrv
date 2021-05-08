const userModel = require('./userModel');

exports.getUsers = function(req, res) {
    userModel.find().exec()
      .catch((error) => res.send(error.message))   
      .then((user) => {res.send(user)})        
};

exports.getUser = function(req, res) {
    userModel.find({_id : req.body.userId}).exec()
      .catch((error) => res.send(error.message))   
       .then((user) => {res.send(user)});
};

exports.updateUser = function(req, res) {
    userModel.findOneAndUpdate({_id: req.body.userId}, {name : req.body.name, age: req.body.age}).exec()
      .catch((error) => res.send(error.message))
      .then((user) => {res.send(user)});
};

exports.addUser = function(req, res) {
  (new userModel({name: req.body.name, age: req.body.age})).save()
    .catch((error) => res.send(error.message))     
    .then((user) => {res.send(user)});
};

exports.deleteUser = function(req, res) {
  userModel.findOneAndDelete({_id: req.body.userId}).exec()
    .then((user) => {res.send(user)})
    .catch((error) => res.send(error.message)); 
};

exports.getUserFriends = function(req, res) {
  userModel.findOne({_id : req.body.userId}).exec()
    .then((user) => {res.send(user.friends)})     //sends friends
    .catch((error) => res.send(error.message));         //sends Error object  
};  


exports.addFriendRequest = function(req, res) {
  userModel.findUserAndDoAnActionWithFriend(req.body.userId, req.body.friendId, 'addFriendRequest')
    .then((friend) => res.send(friend))   //sends friend object
    .catch((error)=> res.send(error.message)); //sends Error object
};

exports.approveFriendRequest = function(req, res) {
  userModel.findUserAndDoAnActionWithFriend(req.body.userId, req.body.friendId, 'approveFriendRequest')
    .then((friend) => res.send(friend))   //sends friend object
    .catch((error) => res.send(error.message)); //sends Error object
};

exports.rejectFriendRequest = function(req, res) {
  userModel.findUserAndDoAnActionWithFriend(req.body.userId, req.body.friendId, 'rejectFriendRequest')
    .then((friend) => res.send(friend))   //sends friend object
    .catch((error) => res.send(error.message)); //sends Error object
};

exports.deleteFriendRequest = function(req, res) {
  userModel.findUserAndDoAnActionWithFriend(req.body.userId, req.body.friendId, 'deleteFriendRequest')
    .then((friend) => res.send(friend))   //sends friend object
    .catch((error) => res.send(error.message)); //sends Error object
};