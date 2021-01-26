const adminService = require('../service/admin.service');
var AdminController = {
    updateUserRole: updateUserRole,
    newRole: newRole,
    getRole: getRole,
    updatePermission: updatePermission,
    getRoleByName: getRoleByName,
    getAllRoles: getAllRoles
}
function getRoleByName(req, res) {
    adminService.findByName(req.params.id)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => { console.log(error); });
}

function getAllRoles(req, res) {
    adminService.getAllRoles()
        .then((data) => {
            res.send(data);
        })
        .catch((error) => { console.log(error); });
}


function getRole(req, res) {

    adminService.getRole(req.params.id)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => { console.log(error); });

}

function newRole(req, res) {

    adminService.newRole(req.body)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => { console.log(error); });
}

function updatePermission(req, res) {

    adminService.updatePermission(req.body)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => { console.log(error); });
}

function updateUserRole(req, res) {

    adminService.updateRole(req.body, req.params.id)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((error) => { console.log(error); });
}


module.exports = AdminController;