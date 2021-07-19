const express =  require('express');
const router = express.Router();
const model = require('./toyModel');
const controller = require('./toyController')
const auth = require('../auth/auth.js')

checkAccessTokenAndUserRole = [passport.authenticate('jwt', {session: false}), auth.isUser];

router.get('/', checkAccessTokenAndUserRole, controller.getToys);
//router.post('/upload', checkAccessTokenAndUserRole, controller.uploadToyImage);
router.post('/', checkAccessTokenAndUserRole, controller.addToy);
router.delete('/', checkAccessTokenAndUserRole, controller.delToy);
router.put('/:toy', checkAccessTokenAndUserRole, controller.updToy);

module.exports = router;