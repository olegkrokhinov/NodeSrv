const express =  require('express');
const router = express.Router();
const pathToUsersJson = './users.json';

function loadData(pathToJson){
    const fs = require('fs');
    const data = fs.readFileSync(pathToJson);
    return JSON.parse(data);
};

function saveData(data, pathToJson){
    const fs = require('fs');
    fs.writeFileSync(pathToJson, JSON.stringify(data));
};


router.get('/', (req, res, next) => {
    res.send(loadData(pathToUsersJson));                  
});

router.get('/:User', (req, res, next) => {
    
    let User = loadData(pathToUsersJson).find(item => item.name == req.params.User);
    User ? res.send(User) : res.send(`User ${req.params.User} not found.`);                  
});

router.put('/update', (req, res, next) => {
    
    let users = loadData(pathToUsersJson);
    let User = users.find(item => item.name == req.body.name);
    if (User) {
        User.age = req.body.age;
        saveData(users, pathToUsersJson);
        res.send(`User ${req.body.name} changed.`);
    } else {
        res.send(`User ${req.body.age} not found.`); 
    };
                     
});

router.post('/add', (req, res, next) => {
    
    let users = loadData(pathToUsersJson);
    if (users.findIndex(item => item.name == req.body.name) == -1) {
        newUser = {name: req.body.name, age: req.body.age}; 
        users.push(newUser);
        saveData(users, pathToUsersJson);
        res.send(`User ${req.body.name} added`);
    } else {
        res.send(`User ${req.body.name} already exists.`); 
    };                  

});

router.delete('/delete', (req, res, next) => {
    
    let users = loadData(pathToUsersJson);
    if (users.splice(users.findIndex(item => item.name == req.body.name))) {
        saveData(users, pathToUsersJson);
        res.send(`User ${req.body.name} deleted.`);
    } else {
        res.send(`User ${req.body.name} not found.`); 
    }; 

});

module.exports = router;