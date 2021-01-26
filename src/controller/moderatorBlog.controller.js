const modblogService = require('../service/modBlog.service');
const upload = require('../utility/image.upload');
const multer = require('multer');


var modblogController = {
    createBlog: createBlog,
    updateBlog: updateBlog,
    deleteBlogById: deleteBlogById,
    postImage: postImage,
    findAllBlogs: findAllBlogs,
    findBlog: findBlog,
    approveBlog: approveBlog,
    rejectBlog: rejectBlog,
    findbyUserId: findbyUserId
}

function unauthorizedResponse(res) {
    res.header('Unauthorized', 1);
    res.header("Access-Control-Expose-Headers", "Unauthorized");
    res.status(200).send({
        stat: "Unauthorized"
    });
}

function findbyUserId(req, res) {

    modblogService.findByUserId(req.params.id)
        .then((data) => { res.send(data); })
        .catch((error) => {
            console.log(error);
        });
}

function findAllBlogs(req, res) {
    if (!(JSON.parse(req.permission)).moderator.read) {
        unauthorizedResponse(res);
    } else {
        modblogService.findAllBlogs()
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}
function findBlog(req, res) {
    if (!(JSON.parse(req.permission)).moderator.read) {
        unauthorizedResponse(res);
    } else {
        modblogService.findBlog(req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function postImage(req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('err-mullter');
        }
        else if (err) {
            console.log('unkownn-err');
            console.log(err);
        }
        var imageUrl = '/images/' + req.file.filename;
        modblogService.addBlogImageUrl(req.params.id, imageUrl)
            .then((data) => {
                res.send(data);
            }).catch((error) => {
                res.send(error);
            });
    })
}

function createBlog(req, res) {
    modblogService.createBlog(req.body)
        .then((data) => { res.send(data); })
        .catch((error) => { console.log(error); });
}

function approveBlog(req, res) {
    if (!(JSON.parse(req.permission)).moderator.approve) {
        unauthorizedResponse(res);
    } else {
        modblogService.acceptBlog(req.body)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

function rejectBlog(req, res) {
    if (!(JSON.parse(req.permission)).moderator.reject) {
        unauthorizedResponse(res);
    } else {
        modblogService.rejectBlog(req.params.id,req.body)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

function updateBlog(req, res) {
    modblogService.updateBlog(req.body, req.params.id, req.user.userId)
        .then((data) => { res.send(data); })
        .catch((error) => { console.log(error); });
}

function deleteBlogById(req, res) {
    modblogService.deleteBlog(req.params.id)
        .then((data) => { res.send(data); })
        .catch((error) => { console.log(error); });
}

module.exports = modblogController;