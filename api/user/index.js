const express =  require('express');
const router = express.Router();

const userModel = require('./userModel');
userController = require('./userController')

router.get('/', userController.getUsers);

router.get('/:user', userController.getUser);
router.put('/:user', userController.updateUser);
router.post('/', userController.addUser);
router.delete('/', userController.deleteUser);

router.get('/:user/friends', userController.getUserFriends);  
router.post('/:User/friends', userController.addFriendRequest);
router.put('/:user/friends/:friend', userController.approveFriendRequest);
router.delete('/:user/friends/:friend', userController.rejectFriendRequest);
router.delete('/:user/friends', userController.deleteFriendRequest);

module.exports = router;