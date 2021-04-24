const express =  require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    
    let usersCollection = req.app.locals.db.collection('users');   
    usersCollection.find({}).toArray(function (err, users){
        if(err) return console.log(err);
        res.send(users);
    });

});

router.get('/:User', (req, res, next) => {
    
    let usersCollection = req.app.locals.db.collection('users');   
    usersCollection.findOne({name : req.params.User}, (err, users) => {
        if(err) return console.log(err);
        res.send(users);
    });
    
});

router.put('/update', (req, res, next) => {
    
    let usersCollection = req.app.locals.db.collection('users');   
    usersCollection.findOneAndUpdate({name : req.body.name}, { $set: {age: req.body.age}}, (err, users) => {
        if(err) return console.log(err);
        res.send(users.value);
    });
                     
});

router.post('/add', (req, res, next) => {

        newUser = {name: req.body.name, age: req.body.age}; 
        
        let usersCollection = req.app.locals.db.collection('users');   
        usersCollection.insertOne(newUser, (err, users) => {
            if(err) return console.log(err);
            res.send(users.ops);
        });               

});

router.delete('/delete', (req, res, next) => {
    
    let usersCollection = req.app.locals.db.collection('users');   
    usersCollection.findOneAndDelete({name : req.body.name}, (err,users) => {
        if(err) return console.log(err);
        res.send(users.value);
    });      

});

module.exports = router;