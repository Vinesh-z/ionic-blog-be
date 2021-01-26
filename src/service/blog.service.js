const blogDao = require('../dao/blog.dao');
const commentsDao = require('../dao/comments.dao');
var Promises = require('es6-promise').Promise;
var blogService = {
    findAllBlogs: findAllBlogs,
    findBlogCount: findBlogCount,
    createBlog: createBlog,
    findBlogById: findBlogById,
    updateBlog: updateBlog,
    deleteBlog: deleteBlog,
    addBlogImageUrl: addBlogImageUrl,
    findBlogsByCategory: findBlogsByCategory,
    findByKeyword: findByKeyword,
    findBlogs: findBlogs,
    findByUserId: findByUserId,
    addLike: addLike,
    removeLike: removeLike,
    findLike: findLike,
    likedBlogs: likedBlogs
}

function findBlogsByCategory(first, second, categoryId) {
    return new Promises((resolve, reject) => {
        blogDao.findByCat(first, second, categoryId).
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
        blogDao.findAll().
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function findLike(like) {
    return new Promises((resolve, reject) => {
        blogDao.findLike(like).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function addLike(like) {
    return new Promises((resolve, reject) => {
        blogDao.findLike(like).then(likeData => {
            if (!likeData.length > 0) {
                blogDao.like(like).
                    then((data) => {
                        blogDao.findOne(like.blogId).then(blog => {
                            blog.likesCount = blog.likesCount + 1;
                            blogDao.updateLike(blog, like.blogId).then(updatedBlog => {
                                resolve(updatedBlog);
                            })
                        })
                    })
            } else {
                removeLike(likeData[0]._id).then(removedLike => {
                    resolve({ "message": "Removed Like" });
                })
            }
        })
            .catch((error) => {
                reject(error);
            });
    });
}

function removeLike(id) {
    return new Promises((resolve, reject) => {
        blogDao.removeLike(id).
            then((data) => {
                blogDao.findOne(data.blogId).then(blog => {
                    blog.likesCount = blog.likesCount - 1;
                    blogDao.updateLike(blog, data.blogId).then(updatedBlog => {
                        resolve(updatedBlog);
                    })
                });
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function findByUserId(first, second, userId) {
    return new Promises((resolve, reject) => {
        blogDao.findByUserId(first, second, userId).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function likedBlogs(first, second, userId) {
    return new Promises((resolve, reject) => {
        blogDao.likedBlogs(first, second, userId).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function findBlogCount(userId) {
    return new Promises((resolve, reject) => {
        blogDao.findCount(userId).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function createBlog(blog) {
    return new Promises((resolve, reject) => {
        blogDao.create(blog).
            then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
    });
}

function findBlogById(id) {
    return new Promises((resolve, reject) => {
        blogDao.findOne(id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function findByKeyword(id) {
    return new Promises((resolve, reject) => {
        blogDao.searchBlog(id).
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
        blogDao.update(blog, id).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function deleteBlog(id) {
    return new Promises((resolve, reject) => {
        blogDao.deleteById(id).
            then((data) => {
                blogDao.likesToBlog(id).then(likes => {
                    likes.forEach(like => {
                        blogDao.removeLike(like._id).then(removedLike => {
                        })
                    })
                });
                commentsDao.findOne(id).then((comments) => {
                    comments.forEach(comment => {
                        commentsDao.deleteComment(comment._id).then(comm => {
                        });
                    });
                });
                resolve(data);
            })
    })
        .catch((error) => {
            reject(error);
        });
}

function findBlogs(first, second) {
    return new Promises((resolve, reject) => {
        blogDao.findBlogs(first, second).
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


function addBlogImageUrl(id, imageUrl) {
    return new Promises((resolve, reject) => {
        blogDao.findOne(id).
            then((data) => {
                data.imageUrl.push(imageUrl);
                blogDao.update(data, id).
                    then((data) => {
                        resolve({ 'message': 'image added' });
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
}




module.exports = blogService;