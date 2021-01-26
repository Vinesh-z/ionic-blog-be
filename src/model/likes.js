const mongoose = require('mongoose');
var LikesSchema = new mongoose.Schema({

    userId: { type: String },
    blogId: { type: String }
});

module.exports = mongoose.model('Likes', LikesSchema);