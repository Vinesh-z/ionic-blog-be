var userService = require('../service/user.service');
const upload = require('../utility/image.upload');
const multer = require('multer');
var userController = {
    addUser: addUser,
    deleteUser: deleteUser,
    findUser: findUser,
    checkLogin: checkLogin,
    updateUser: updateUser,
    // googleLogin: googleLogin,
    profilePic: profilePic,
    userFromToken: userFromToken
}


function updateUser(req, res) {
    userService.updateUser(req.body)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => { res.send(error); });
}

function profilePic(req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('err-mullter');
        }
        else if (err) {
            console.log('unkownn-err');
            console.log(err);
        }
        var imageUrl = '/images/' + req.file.filename;
        
        userService.addProfilePic(req.params.id, imageUrl)
            .then((data) => {
                res.send(data);
            }).catch((error) => {
                res.send(error);
            });
    });

}

// function googleLogin(req, res) {
//     authService.googleLogin(req.body)
//         .then((data) => { res.send(data); })
//         .catch((error) => { console.log(error); });
// }


function addUser(req, res) {
    userService.addUser(req.body)
        .then((data) => { res.send(data); })
        .catch((error) => { console.log(error); });
}

function checkLogin(req, res) {
    userService.login(req.body)
        .then((data) => { res.send(data); })
        .catch((error) => { res.send(error); });
}

function findUser(req, res) {
    userService.findUserById(req.params.id)
        .then((data) => { res.send(data); })
        .catch((error) => { console.log(error); });
}

function userFromToken(req, res) {
    res.send(req.user);
}

function deleteUser(req, res) {
    userService.deleteUser(req.params.id)
        .then((data) => { res.send(data); })
        .catch((error) => { console.log(error); });
}
module.exports = userController; 