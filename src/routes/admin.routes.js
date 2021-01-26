const express = require('express');
const router = express.Router();
const AdminController = require('../controller/admin.controller');
 
router.post('/role',AdminController.newRole);
router.get('/role/:id',AdminController.getRole);
router.get('/allRoles',AdminController.getAllRoles);
router.get('/byName/:id',AdminController.getRoleByName);
router.put('/permission',AdminController.updatePermission);
router.put('/role/:id', AdminController.updateUserRole);


module.exports = router;