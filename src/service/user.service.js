const userDao = require('../dao/user.dao');
const User = require('../model/user');
const auth = require('../utility/auth');
var Promises = require('es6-promise').Promise;
const bcrypt = require('bcrypt-nodejs');
var userService = {
    addUser: addUser,
    deleteUser: deleteUser,
    findUserById: findUserById,
    login: login,
    updateUser: updateUser,
    addProfilePic: addProfilePic
}

function addUser(user) {
    return new Promises((resolve, reject) => {
        userDao.findByEmail(user.emailId).
            then((data) => {
                if (data.length > 0) {
                    resolve({ "message": "User already exists" })
                }
                else {
                    bcrypt.hash(user.password, bcrypt.genSaltSync(5), null, (error, hash) => {
                        if (error) {
                            reject({ "message": "Error Saving" });
                        }
                        else
                            user.password = hash;
                        userDao.create(user).
                            then((data) => {
                                const token = auth.generateToken(data);
                                resolve({
                                    "message": user.name + " has been registered successfully",
                                    "token": token
                                });
                            })
                    });
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function addProfilePic(id, imageUrl) {
    return new Promises((resolve, reject) => {
        userDao.findByEmail(id).
            then((data) => {
                data[0].profile = imageUrl;
                userDao.update(data[0], data[0]._id).
                    then((data) => {
                        resolve({ "message": 'image added' });
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
}


function login(user) {
    return new Promises((resolve, reject) => {
        userDao.findByEmail(user.emailId).
            then((data) => {
                if (data.length == 0) {
                    resolve({
                        "message": "User not found",
                        "status": "404"
                    })
                }
                else {
                    userFromDb = data[0];
                    if (bcrypt.compare(user.password, userFromDb.password, (error, res) => {

                        if (error || res == false) {
                            resolve({
                                "message": "Incorrect Password",
                                "status": "403"
                            });
                            return;
                        }

                        else {
                            const token = auth.generateToken(userFromDb);
                            resolve({
                                "message": "Successfully logged in as " + userFromDb.name,
                                "status": "200",
                                "token": token
                            });
                        }
                    }));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}


function findUserById(id) {
    return new Promises((resolve, reject) => {
        userDao.findByEmail(id).
            then((data) => {
                if (data.length == 0) {
                    resolve({
                        "message": "User not found",
                        "status": "404"
                    })
                } else {
                    data[0].password = null;
                    resolve(data[0]);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function updateUser(user) {

    return new Promises((resolve, reject) => {
        userDao.findOne(user._id).then((data) => {
            if (data.length == 0) {
                resolve({
                    "message": "User not found",
                    "status": "404"
                })
            } else {
                userDao.update(user, user._id).
                    then((updatedUser) => {
                        resolve(updatedUser);
                    })
            }
        })
            .catch((error) => {
                reject(error);
            });
    })
}

function deleteUser(id) {
    return new Promises((resolve, reject) => {
        userDao.deleteById(id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = userService;