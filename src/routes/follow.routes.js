const express = require('express');
const router = express.Router();
const FollowController = require('../controller/follows.controller');

router.get('/followers/:id', FollowController.getfollowers);
router.get('/following/:id', FollowController.getfollowing);
router.get('/followersCount/:id', FollowController.followersCount);
router.get('/followingCount/:id', FollowController.followingCount);
router.post('/isFollowing', FollowController.isFollowing);
router.post('/', FollowController.addfollow);
router.delete('/remove/:id', FollowController.removeFollow);

module.exports = router;