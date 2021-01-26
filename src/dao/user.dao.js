var User = require('../model/user');
var userDao = {
    create: create,
    deleteById: deleteById,
    findOne:findOne,
    findByEmail:findByEmail,
    update:update
}

function create(user) {

    var newUser = new User(user);
   
    return newUser.save();
}

function deleteById(id){
    return User.findByIdAndRemove(id);
}

function findOne(id) {
    return User.findById(id);
}

function findByEmail(emailId){
    return User.find({'emailId': emailId});
}

function update(user, id) {
    var newUser = {
        name: user.name,
        emailId: user.emailId,
        dob:  user.dob,
        gender: user.gender,
        likedBlogs:user.likedBlogs,
        myBlogs: user.myBlogs,
        profile: user.profile,
        about:user.about
    };

    var userId = id;
   
    return User.findByIdAndUpdate(userId, { $set: newUser }, { new: true });


}
module.exports = userDao;