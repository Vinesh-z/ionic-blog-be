var Role = require('../model/roles');
var rolesDao = {
    create: create,
    findOne: findOne,
    update: update,
    findByName:findByName,
    findRoles:findRoles
}

function findByName(name) {
    return Role.find({ 'name': name });
}

function findRoles() {
    return Role.find({});
}

function create(role) {

    var newRole = new Role(role);

    return newRole.save();
}

function findOne(id) {
    return Role.findById(id);
}

function update(role, id) {
    var newRole = {
        name: role.name,
        permission: role.permission
    };
    var roleId = id;

    return Role.findByIdAndUpdate(roleId, { $set: newRole }, { new: true });


}
module.exports = rolesDao;