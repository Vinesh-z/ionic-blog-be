var Comments = require('../model/comments');

var ObjectId = require('mongoose').Types.ObjectId;
var commentsDao = {
    findAllComments: findAllComments,
    createComment: createComment,
    findOne: findOne,
    updateComment: updateComment,
    deleteComment: deleteComment,
    findComment:findComment

};
function createComment(comments) {

    var newComments = new Comments(comments);
    return newComments.save();

}
function findAllComments() {
    return Comments.find({});
}


function findComment(commentId) {
    return Comments.findById(commentId);
}
 
function findOne(blogId) {
    return Comments.find({'blogId': blogId});

}
function updateComment(comments, id) {
    var newComment = {
        content: comments.content,
        subComments:comments.subComments
    };

    var commentId = id;
    return Comments.findByIdAndUpdate(commentId, { $set: newComment }, { new: true });


}
function deleteComment(id) {
    return Comments.findByIdAndRemove(id);
}


module.exports = commentsDao;

