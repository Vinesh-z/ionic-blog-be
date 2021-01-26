const permissions = require('../permission/permission');
var Promises = require('es6-promise').Promise;
const userDao = require('../dao/user.dao');
const rolesDao = require('../dao/roles.dao');
var adminService = {
    updateRole:updateRole,
    newRole:newRole,
    getRole:getRole,
    updatePermission:updatePermission,
    getAllRoles:getAllRoles,
    findByName:findByName
}



function getRole(id) {
    return new Promises((resolve, reject) => {
        rolesDao.findOne(id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function findByName(id) {
    return new Promises((resolve, reject) => {
        rolesDao.findByName(id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function getAllRoles() {
    return new Promises((resolve, reject) => {
        rolesDao.findRoles().
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function newRole(role) {
    return new Promises((resolve, reject) => {
      
        role.permission = permissions.newRole;
        rolesDao.create(role).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function updatePermission(role) {
    return new Promises((resolve, reject) => {

        rolesDao.update(role, role._id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function updateRole(user, adminMailId) {
    return new Promises((resolve, reject) => {
        if (user.emailId === adminMailId) {
            resolve("You cannot change your own role");
            return;
        }
        adminLogsDao.updateRole(user, user._id).
            then((data) => {
                userDao.findByEmail(adminMailId).then(data2 => {
                    Log.log = data2[0].name + " changed role of " + '"' + user.name + '"' + " to " + user.userRole;
                    adminLogsDao.addlog(Log).then(data => {

                    });
                })
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


module.exports = adminService;