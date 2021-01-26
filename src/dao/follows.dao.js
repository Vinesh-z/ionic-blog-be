var Follows = require('../model/follow');
var ObjectId = require('mongoose').Types.ObjectId;
var followsDao = {
    getfollowers: getfollowers,
    getfollowing: getfollowing,
    followersCount: followersCount,
    followingCount: followingCount,
    addfollow: addfollow,
    removeFollow: removeFollow,
    isFollowing: isFollowing
}

function isFollowing(follow) {
    return Follows.find({
        $and: [
            { "userId": { "$in": [follow.userId] } },
            { "authorId": { "$in": [follow.authorId] } }
        ]
    })
}
  
function addfollow(follow) {
    var newFollow = new Follows(follow);
    return newFollow.save();
}

function getfollowers(id) {
    return Follows.find({ authorId: id });
}

function getfollowing(id) {
    return Follows.find({ userId: id });
}

function followersCount(id) {
    return Follows.find({ authorId: id }).countDocuments();
}

function followingCount(id) {
    return Follows.find({ userId: id }).countDocuments();
}

function removeFollow(id) {
    return Follows.findByIdAndRemove(id);
}




module.exports = followsDao;