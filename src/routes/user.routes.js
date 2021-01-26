const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../utility/auth');

router.post('/', userController.addUser);
router.post('/profile/:id', userController.profilePic);
// router.post('/google', userController.googleLogin);
router.put('/', userController.updateUser);
router.get('/byId/:id', userController.findUser);
router.get('/token', auth.validateToken, userController.userFromToken);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.checkLogin);
module.exports = router;