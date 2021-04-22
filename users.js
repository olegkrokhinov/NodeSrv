const express =  require('express');
const router = express.Router();

const fs = require('fs');
const data = fs.readFileSync('./users.json');
const users = JSON.parse(data);

router.get('/', (req, res, next) => {
    res.send(users);                  
});

router.get('/:User', (req, res, next) => {
    let UserFromDB = users.find(item => item.name==req.params.User);
    UserFromDB ? res.send(UserFromDB) : res.send(`User ${req.params.User} not found.`);                  
});

router.put('/:User', (req, res, next) => {
    res.send(`Put ${req.params.User}`);                   
});

router.post('/:User', (req, res, next) => {
    res.send(`Post ${req.params.User}`);                   
});

router.delete('/:User', (req, res, next) => {
    res.send(`Delete ${req.params.User}`);                   
});

module.exports = router;