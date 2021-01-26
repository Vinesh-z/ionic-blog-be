const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const User = require('./user');

var BlogSchema = new mongoose.Schema({
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
    imageUrl: [],
    tags: [],
    reportCount: { type: Number, default: 0 }
});
BlogSchema.plugin(timestamps);

module.exports = mongoose.model('Blog', BlogSchema);