const express =  require('express');
const router = express.Router();

const mongoose = require('mongoose');
const userShema = require('./userModel');
const userModel = mongoose.model('User');



router.get('/', (req, res, next) => {
  userModel.find().exec()
    .catch((error) => res.send(error.message))   
    .then((user) => {res.send(user)})        
});

router.get('/:user', (req, res, next) => {
   userModel.find({_id : req.body.userId}).exec()
     .catch((error) => res.send(error.message))   
     .then((user) => {res.send(user)});
});

router.put('/:user', (req, res, next) => {
  userModel.findOneAndUpdate({_id: req.body.userId}, {name : req.body.name, age: req.body.age}).exec()
    .catch((error) => res.send(error.message))
    .then((user) => {res.send(user)});
});

router.post('/', (req, res, next) => {
  (new userModel({name: req.body.name, age: req.body.age})).save()
    .catch((error) => res.send(error.message))     
    .then((user) => {res.send(user)});
});

router.delete('/', (req, res, next) => {
  userModel.findOneAndDelete({_id: req.body.userId}).exec()
    .then((user) => {res.send(user)})
    .catch((error) => res.send(error.message)); 
});

router.get('/:user/friends', (req, res, next) => {
  userModel.findOne({_id : req.body.userId}).exec()
    .then((user) => {res.send(user.friends)})     //sends friends
    .catch((error) => res.send(error.message));         //sends Error object  
});  


router.post('/:User/friends', (req, res, next) => {
  userModel.findUserAndDoAnActionWithFriend(req.body.userId, req.body.friendId, 'addFriendRequest')
    .then((friend) => res.send(friend))   //sends friend object
    .catch((error)=> res.send(error.message)); //sends Error object
});

router.put('/:user/friends/:friend', (req, res, next) => {
  userModel.findUserAndDoAnActionWithFriend(req.body.userId, req.body.friendId, 'approveFriendRequest')
    .then((friend) => res.send(friend))   //sends friend object
    .catch((error) => res.send(error.message)); //sends Error object
});

router.put('/:user/friends/:friend', (req, res, next) => {
  userModel.findUserAndDoAnActionWithFriend(req.body.userId, req.body.friendId, 'rejectFriendRequest')
    .then((friend) => res.send(friend))   //sends friend object
    .catch((error) => res.send(error.message)); //sends Error object
});

router.delete('/:user/friends', (req, res, next) => {
  userModel.findUserAndDoAnActionWithFriend(req.body.userId, req.body.friendId, 'deleteFriendRequest')
    .then((friend) => res.send(friend))   //sends friend object
    .catch((error) => res.send(error.message)); //sends Error object
});


module.exports = router;