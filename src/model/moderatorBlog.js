const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const User = require('./user');

var ModeratorBlogSchema = new mongoose.Schema({
    blogName: {
        type: String
    },
    author: [User.schema],
    content: {
        type: String
    },
    categoryId: {
        type: String
    },
    likesCount: { type: Number, default: 0 },
    status: { type: String, default: "pending"},
    reason: { type: String, default: "under review"},
    imageUrl: [],
    tags: [],
    reportCount: { type: Number, default: 0 }
});
ModeratorBlogSchema.plugin(timestamps);

module.exports = mongoose.model('ModeratorBlog', ModeratorBlogSchema);