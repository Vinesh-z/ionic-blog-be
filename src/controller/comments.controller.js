const commentsService = require('../service/comments.service')
var commentsController = {

    createComment: createComment,
    findByPost: findByPost,
    deleteComment: deleteComment,
    nestedComment: nestedComment,
    updateComment: updateComment
}

function unauthorizedResponse(res) {
    res.header('Unauthorized', 1);
    res.header("Access-Control-Expose-Headers", "Unauthorized");
    res.status(200).send({
        stat: "Unauthorized"
    });
}


function createComment(req, res) {
    if (!(JSON.parse(req.permission)).comment.create) {
        unauthorizedResponse(res);
    } else {
        commentsService.addComment(req.body)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

function nestedComment(req, res) {
    if (!(JSON.parse(req.permission)).comment.createNestedComment) {
        unauthorizedResponse(res);
    } else {
        commentsService.addNestedComment(req.params.id, req.body)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

function findByPost(req, res) {
    if (!(JSON.parse(req.permission)).comment.read) {
        unauthorizedResponse(res);
    } else {
        commentsService.findCommentById(req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

function updateComment(req, res) {
    commentsService.updateComment(req.body, req.params.id)
        .then((data) => { res.send(data); })
        .catch((error) => { console.log(error); });
}


function deleteComment(req, res) {
    if (!(JSON.parse(req.permission)).comment.delete) {
        unauthorizedResponse(res);
    } else {
        commentsService.deleteComment(req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

module.exports = commentsController;