const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const User = require('./user');

var CommentsSchema = new mongoose.Schema({
   author: User.schema, 
   blogId: String,
   content: String,
   subComments: []
});
CommentsSchema.plugin(timestamps);

module.exports = mongoose.model('Comments', CommentsSchema);