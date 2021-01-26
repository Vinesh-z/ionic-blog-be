const mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
    name: String,
    permission: Object
});


module.exports = mongoose.model('Role', RoleSchema);