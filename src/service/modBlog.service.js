const modblogDao = require('../dao/modBlog.dao');
const blogService = require('../service/blog.service');
const Blog = require('../model/blog');
var Promises = require('es6-promise').Promise;
var modblogService = {
    createBlog: createBlog,
    updateBlog: updateBlog,
    deleteBlog: deleteBlog,
    addBlogImageUrl: addBlogImageUrl,
    acceptBlog: acceptBlog,
    rejectBlog: rejectBlog,
    findAllBlogs: findAllBlogs,
    findBlog: findBlog,
    findByUserId: findByUserId
}


function createBlog(blog) {
    return new Promises((resolve, reject) => {
        modblogDao.create(blog).
            then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
    });
}

function findByUserId(userId) {
    return new Promises((resolve, reject) => {
        modblogDao.findByUserId(userId).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function findBlog(modBlogId) {
    return new Promises((resolve, reject) => {
        modblogDao.findOne(modBlogId).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
function findAllBlogs() {
    return new Promises((resolve, reject) => {
        modblogDao.findModBlogs().
            then((data) => {
                resolve(data);
            })
            .catch((error) => {

                reject(error);
            });
    });
}


function updateBlog(blog, id, userId) {
    return new Promises((resolve, reject) => {
        modblogDao.update(blog, id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


function acceptBlog(modBlog) {
    return new Promises((resolve, reject) => {
        modblogDao.findOne(modBlog._id).
            then((data) => {
                if (data) {
                    const blog = new Blog();
                    blog._id = modBlog._id;
                    blog.blogName = data.blogName;
                    blog.imageUrl = data.imageUrl;
                    blog.tags = data.tags;
                    blog.reportCount = data.reportCount;
                    blog.likesCount = data.likesCount;
                    blog.author = data.author;
                    blog.categoryId = data.categoryId;
                    blog.content = data.content;
                    blog.createdAt = data.createdAt;
                    blog.__v = data.__v;
                    blogService.createBlog(blog)
                        .then((data) => {
                            modblogDao.deleteById(modBlog._id)
                                .then((data) => {
                                    resolve(data);
                                })
                        })
                }
                else {
                    resolve({ "message": "no blog found" });
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function rejectBlog(blogId,modBlog) {
    return new Promises((resolve, reject) => {
        modBlog.status = "rejected";
        modblogDao.update(modBlog, blogId).
            then((data) => {
                console.log(data);
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function deleteBlog(id) {
    return new Promises((resolve, reject) => {
        modblogDao.deleteById(id).
            then((data) => {
                resolve(data);
            })
    })
        .catch((error) => {
            reject(error);
        });
}

function addBlogImageUrl(id, imageUrl) {
    return new Promises((resolve, reject) => {
        modblogDao.findOne(id).
            then((data) => {
                data.imageUrl.push(imageUrl);
                modblogDao.update(data, id).
                    then((data) => {
                        resolve({ 'message': 'image added' });
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = modblogService;