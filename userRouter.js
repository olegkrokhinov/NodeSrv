const express =  require('express');
const router = express.Router();

require('./userModel');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');



router.get('/', (req, res, next) => {
  
  userModel.find((err, users)=>{
    if(err) return res.send(err);
    res.send(users);
  });

});

router.get('/:user', (req, res, next) => {
    
  userModel.find({_id : req.body.userId}, (err, users) => {
    if(err) return res.send(err);
    res.send(users);
  });
    
});

router.put('/:user', (req, res, next) => {
    
  userModel.findOneAndUpdate({_id: req.body.userId}, {name : req.body.name, age: req.body.age}, (err, user) => {
    if(err) return res.send(err);
    res.send(user ? user.value : `User ${req.body.name} not found.`);
  });             

});

router.post('/', (req, res, next) => {

  let user = new userModel({name: req.body.name,age: req.body.age});
  user.save((err, user) => {
    if(err) return res.send(err);
    res.send(user);
  });                       

});

router.delete('/', (req, res, next) => {
    
  userModel.findOneAndDelete({_id: req.body.userId}, (err,user) => {
    if(err) return res.send(err);
    res.send(user ? user.value : `User ${req.body.name} not found.`);
  });      

});

router.get('/:user/friends', (req, res, next) => {
    
  userModel.findOne({_id : req.body.userId}, (err, user) => {
    if(err) return res.send(err);
    res.send(user.friends);
  });  

});

router.post('/:User/friends', (req, res, next) => {

  userModel.addFriendRequestToUser(req.body.userId, req.body.friendId, (err, friend)=>{
    if(err) return res.send(err);
    res.send(friend); 
  });

});

router.put('/:user/friends', (req, res, next) => {

  userModel.approveFirendRequestForUser(req.body.userId, req.body.friendId, (err, friend)=>{
    if(err) return res.send(err);
    res.send(friend); 
  });

});

router.delete('/:user/friends', (req, res, next) => {

  userModel.deleteFriendRequestFromUser(req.body.userId, req.body.friendId, (err, friend) =>{
    if (err) return res.send(err);
    res.send(friend); 
  });

});


module.exports = router;