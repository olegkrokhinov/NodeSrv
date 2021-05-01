const express =  require('express');
const router = express.Router();

require('./userModel');
const mongoose = require('mongoose');
const userModel = mongoose.model('User');

router.get('/', (req, res, next) => {
    
    userModel.find((err, users)=>{
        if(err) return console.log(err);
        res.send(users);
    });

});

router.get('/:User', (req, res, next) => {
    
    userModel.find({name : req.params.User}, (err, users) => {
        if(err) return console.log(err);
        res.send(users);
    });
    
});

router.get('/:User/friends', (req, res, next) => {
    
    userModel.findOne({name : req.params.User}, (err, user) => {
        if(err) return console.log(err);
        res.send(user.friends);
    });  

});

router.put('/updateUser', (req, res, next) => {
    
    userModel.findOneAndUpdate({name : req.body.name}, {age: req.body.age}, (err, user) => {
        if(err) return console.log(err);
        res.send(user ? user.value : `User ${req.body.name} not found.`);
    });             
});

router.post('/approveFriend', (req, res, next) => {
    userModel.findUser_And_ApproveFriend(req.body.userId, req.body.friendId, (err, friend)=>{
        if(err) return console.log(err);
        res.send(friend); 
    });
});


router.post('/addUser', (req, res, next) => {

    let user = new userModel({name: req.body.name,age: req.body.age});
    user.save((err, user) => {
            if(err) return console.log(err);
            res.send(user);
        });                       

});

router.post('/addFriendRequest', (req, res, next) => {
    userModel.findUser_And_AddFriendRequest(req.body.userId, req.body.friendId, (err, friend)=>{
        if(err) return console.log(err);
        res.send(friend); 
    });
});

router.delete('/deleteFriend', (req, res, next) => {
    userModel.findUser_And_DeleteFriend(req.body.userId, req.body.friendId, (err, friend) =>{
        if(err) return console.log(err);
        res.send(friend); 
    });
});

router.delete('/deleteUser', (req, res, next) => {
    
    userModel.findOneAndDelete({name : req.body.name}, (err,user) => {
        if(err) return console.log(err);
        res.send(user ? user.value : `User ${req.body.name} not found.`);
    });      

});

module.exports = router;