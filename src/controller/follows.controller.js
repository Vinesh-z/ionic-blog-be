const followsService = require('../service/follows.service');

var followsController = {
    getfollowers: getfollowers,
    getfollowing: getfollowing,
    followersCount: followersCount,
    followingCount: followingCount,
    addfollow: addfollow,
    removeFollow: removeFollow,
    isFollowing: isFollowing
}

function unauthorizedResponse(res) {
    res.header('Unauthorized', 1);
    res.header("Access-Control-Expose-Headers", "Unauthorized");
    res.status(200).send({
        stat: "Unauthorized"
    });
}

function getfollowers(req, res) {
    if (!(JSON.parse(req.permission)).follow.read) {
        unauthorizedResponse(res);
    } else {
        followsService.getfollowers(req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function isFollowing(req, res) {
    if (!(JSON.parse(req.permission)).follow.read) {
        unauthorizedResponse(res);
    } else {
        followsService.isFollowing(req.body)
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function getfollowing(req, res) {
    if (!(JSON.parse(req.permission)).follow.read) {
        unauthorizedResponse(res);
    } else {
        followsService.getfollowing(req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function followersCount(req, res) {
    if (!(JSON.parse(req.permission)).follow.read) {
        unauthorizedResponse(res);
    } else {
        followsService.followersCount(req.params.id)
            .then((data) => { res.send({ "count": data }); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function followingCount(req, res) {
    if (!(JSON.parse(req.permission)).follow.read) {
        unauthorizedResponse(res);
    } else {
        followsService.followingCount(req.params.id)
            .then((data) => { res.send({ "count": data }); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function addfollow(req, res) {
    if (!(JSON.parse(req.permission)).follow.create) {
        unauthorizedResponse(res);
    } else {
        followsService.addfollow(req.body)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

function removeFollow(req, res) {
    if (!(JSON.parse(req.permission)).follow.create) {
        unauthorizedResponse(res);
    } else {
        followsService.removeFollow(req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = followsController;