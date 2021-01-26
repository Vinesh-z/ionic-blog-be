const blogService = require('../service/blog.service');
const upload = require('../utility/image.upload');
const multer = require('multer');


var blogController = {
    findAllBlogs: findAllBlogs,
    findBlogCount: findBlogCount,
    createBlog: createBlog,
    updateBlog: updateBlog,
    deleteBlogById: deleteBlogById,
    postImage: postImage,
    searchBlog: searchBlog,
    getBlogsByCategory: getBlogsByCategory,
    findBlogBykeyword: findBlogBykeyword,
    findBlogs: findBlogs,
    findbyUserId: findbyUserId,
    like: like,
    removeLike: removeLike,
    findLike: findLike,
    likedBlogs: likedBlogs
}
function unauthorizedResponse(res) {
    res.header('Unauthorized', 1);
    res.header("Access-Control-Expose-Headers", "Unauthorized");
    res.status(200).send({
        stat: "Unauthorized"
    });
}

function findBlogs(req, res) {
    if (!(JSON.parse(req.permission)).blog.read) {
        unauthorizedResponse(res);
    } else {
        blogService.findBlogs(req.params.first, req.params.second)
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function like(req, res) {
    if (!(JSON.parse(req.permission)).like.create) {
        unauthorizedResponse(res);
    } else {
        blogService.addLike(req.body)
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function findLike(req, res) {

    blogService.findLike(req.body)
        .then((data) => { res.send(data); })
        .catch((error) => {
            console.log(error);
        });
}

function removeLike(req, res) {
    if (!(JSON.parse(req.permission)).like.create) {
        unauthorizedResponse(res);
    } else {
        blogService.removeLike(req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function findbyUserId(req, res) {
    if (!(JSON.parse(req.permission)).blog.read) {
        unauthorizedResponse(res);
    } else {
        blogService.findByUserId(req.params.first, req.params.second, req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function likedBlogs(req, res) {
    if (!(JSON.parse(req.permission)).blog.read) {
        unauthorizedResponse(res);
    } else {
        blogService.likedBlogs(req.params.first, req.params.second, req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function getBlogsByCategory(req, res) {
    if (!(JSON.parse(req.permission)).blog.read) {
        unauthorizedResponse(res);
    } else {
        blogService.findBlogsByCategory(req.params.first, req.params.second, req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function findAllBlogs(req, res) {
    if (!(JSON.parse(req.permission)).blog.read) {
        unauthorizedResponse(res);
    } else {
        blogService.findAllBlogs()
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function findBlogCount(req, res) {
    if (!(JSON.parse(req.permission)).blog.read) {
        unauthorizedResponse(res);
    } else {
        blogService.findBlogCount(req.params.userId)
            .then((data) => { res.send({ 'count': data }); })
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
        blogService.addBlogImageUrl(req.params.id, imageUrl)
            .then((data) => {
                res.send(data);
            }).catch((error) => {
                res.send(error);
            });
    })
}

function createBlog(req, res) {
    if (!(JSON.parse(req.permission)).blog.create) {
        unauthorizedResponse(res);
    } else {
        blogService.createBlog(req.body)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

function searchBlog(req, res) {
    if (!(JSON.parse(req.permission)).blog.read) {
        unauthorizedResponse(res);
    } else {
        blogService.findBlogById(req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

function findBlogBykeyword(req, res) {
    if (!(JSON.parse(req.permission)).blog.read) {
        unauthorizedResponse(res);
    } else {
        blogService.findByKeyword(req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

function updateBlog(req, res) {
    if (!(JSON.parse(req.permission)).blog.update || req.body.author[0]._id !== req.user.userId) {
        unauthorizedResponse(res);
    } else {
        blogService.updateBlog(req.body, req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

function deleteBlogById(req, res) {
    if (!(JSON.parse(req.permission)).blog.delete) {
        unauthorizedResponse(res);
    } else {
        blogService.deleteBlog(req.params.id)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}


module.exports = blogController;