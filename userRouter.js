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

router.put('/update', (req, res, next) => {
    
    userModel.findOneAndUpdate({name : req.body.name}, {age: req.body.age}, (err, user) => {
        if(err) return console.log(err);
        res.send(user ? user.value : `User ${req.body.name} not found.`);
    });
      //`useFindAndModify`                
});

router.post('/add', (req, res, next) => {

    let user = new userModel({name: req.body.name,age: req.body.age});
    user.save((err, user) => {
            if(err) return console.log(err);
            res.send(user);
        });                       

});

router.delete('/delete', (req, res, next) => {
    
    userModel.findOneAndDelete({name : req.body.name}, (err,user) => {
        if(err) return console.log(err);
        res.send(user ? user.value : `User ${req.body.name} not found.`);
    });      

});

module.exports = router;