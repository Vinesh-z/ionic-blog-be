const mongoose = require('mongoose');
var FollowSchema = new mongoose.Schema({

    userId: { type: String },
    authorId: { type: String }
});

module.exports = mongoose.model('follows', FollowSchema);