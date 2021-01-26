const commentsDao = require('../dao/comments.dao')
var Promises = require('es6-promise').Promise;
var Filter = require('bad-words'),
    filter = new Filter();
var commentsService = {

    addComment: addComment,
    findCommentById: findCommentById,
    deleteComment: deleteComment,
    addNestedComment: addNestedComment,
    updateComment:updateComment
}



function addComment(comment) {
    return new Promises((resolve, reject) => {
        comment.content = filter.clean(comment.content);
        commentsDao.createComment(comment).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function addNestedComment(commentId, comment) {
    return new Promises((resolve, reject) => {
        commentsDao.findComment(commentId).then((data) => {
            data.subComments.push(comment);
            commentsDao.updateComment(data, commentId).
                then((data) => {
                    resolve(data);
                })
        }).catch((error) => {
            reject(error);
        });


    });
}

function findCommentById(blogId) {
    return new Promises((resolve, reject) => {
        commentsDao.findOne(blogId).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function updateComment(comment, id) {
    return new Promises((resolve, reject) => {
        commentsDao.updateComment(comment, id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function deleteComment(id, adminEmail) {
    return new Promises((resolve, reject) => {
        commentsDao.deleteComment(id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}




module.exports = commentsService;