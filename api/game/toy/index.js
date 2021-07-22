const express =  require('express');
const router = express.Router();
const model = require('./toyModel');
const controller = require('./toyController')

const passport = require('passport');
const auth = require('../../auth/auth.js')

checkAccessTokenAndUserRole = [passport.authenticate('jwt', {session: false}), auth.isUser];

router.get('/', checkAccessTokenAndUserRole, controller.getToys);
router.post('/', checkAccessTokenAndUserRole, controller.addToy);
router.put('/', checkAccessTokenAndUserRole, controller.updToy);
router.delete('/', checkAccessTokenAndUserRole, controller.delToy);




module.exports = router;