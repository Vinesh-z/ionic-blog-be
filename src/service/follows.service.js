const followsDao = require('../dao/follows.dao');
var Promises = require('es6-promise').Promise;
var followsService = {
    getfollowers: getfollowers,
    getfollowing: getfollowing,
    followersCount: followersCount,
    followingCount: followingCount,
    addfollow: addfollow,
    removeFollow: removeFollow,
    isFollowing: isFollowing
}

function getfollowers(id) {
    return new Promises((resolve, reject) => {
        followsDao.getfollowers(id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function isFollowing(follow) {
    return new Promises((resolve, reject) => {
        followsDao.isFollowing(follow).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function getfollowing(id) {
    return new Promises((resolve, reject) => {
        followsDao.getfollowing(id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function followersCount(id) {
    return new Promises((resolve, reject) => {
        followsDao.followersCount(id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function followingCount(id) {
    return new Promises((resolve, reject) => {
        followsDao.followingCount(id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


function addfollow(follow) {
    return new Promises((resolve, reject) => {
        followsDao.addfollow(follow).
            then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
    });
}

function removeFollow(id) {
    return new Promises((resolve, reject) => {
        followsDao.removeFollow(id).
            then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
    });
}

module.exports = followsService;