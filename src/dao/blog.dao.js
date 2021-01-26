var Blog = require('../model/blog');
var Category = require('../model/category');
var ObjectId = require('mongoose').Types.ObjectId;
var Like = require('../model/likes');
var blogDao = {
    create: create,
    findAll: findAll,
    findBlogs: findBlogs,
    findCount: findCount,
    findOne: findOne,
    update: update,
    searchBlog: searchBlog,
    findByInappropriate: findByInappropriate,
    deleteById: deleteById,
    findByCat: findByCat,
    findByUserId: findByUserId,
    like: like,
    removeLike: removeLike,
    findLike: findLike,
    likedBlogs: likedBlogs,
    updateLike: updateLike,
    likesToBlog: likesToBlog
};

function create(blog) {
    var newBlog = new Blog(blog);
    return newBlog.save();
}

function like(like) {
    var newLike = new Like(like);
    return newLike.save();
}

function removeLike(id) {
    return Like.findByIdAndRemove(id);
}

function findLike(like) {
    return Like.find({
        $and: [
            { "userId": { "$in": [like.userId] } },
            { "blogId": { "$in": [like.blogId] } }
        ]
    })
}

function likesToBlog(blogId) {
    return Like.find({ "blogId": { "$in": [blogId] } });
}

function findAll() {
    return Blog.find({});
}

function findBlogs(first, second) {
    var orderBy = { createdAt: -1 };
    return Blog.find({}).sort(orderBy).skip(parseInt(first, 10)).limit(parseInt(second, 10));
}


function findByInappropriate() {
    var orderBy = { inappropriateCount: -1 };
    return Blog.find({}).sort(orderBy);
}

function findCount(userId) {
    return Blog.find({ author: { $elemMatch: { "_id": userId } } }).count();
}

function findOne(id) {
    return Blog.findById({ _id: id });
}

function findByUserId(first, second, userId) {
    var orderBy = { createdAt: -1 };
    return Blog.find({ author: { $elemMatch: { "_id": userId } } }).sort(orderBy).skip(parseInt(first, 10)).limit(parseInt(second, 10));
}

function likedBlogs(first, second, userId) {
    var orderBy = { createdAt: -1 };
    return Like.find({ userId: userId }).sort(orderBy).skip(parseInt(first, 10)).limit(parseInt(second, 10));
}

function searchBlog(key) {
    return Blog.find({
        $or: [
            { "content": { $regex: "." + key + "." } },
            { "authorName": { "$in": [key] } },
            { "blogName": { "$in": [key] } },
            { "tags": { "$in": [key] } }
        ]
    }).limit(parseInt(10, 10));
}

function findByCat(first, second, id) {
    var orderBy = { createdAt: -1 };
    return Blog.find({ "categoryId": id }).sort(orderBy).skip(parseInt(first, 10)).limit(parseInt(second, 10));
}


function update(blog, id) {
    var newBlog = {
        blogName: blog.blogName,
        gadgetName: blog.gadgetName,
        content: blog.content,
        imageUrl: blog.imageUrl,
        __v: blog.__v,
        inappropriateCount: blog.inappropriateCount

    };

    var blogId = id;

    return Blog.findByIdAndUpdate(blogId, { $set: newBlog }, { new: true });
}

function updateLike(blog, id) {
    var newBlog = {
        blogName: blog.blogName,
        gadgetName: blog.gadgetName,
        content: blog.content,
        likesCount: blog.likesCount,
        imageUrl: blog.imageUrl,
        __v: blog.__v,
        inappropriateCount: blog.inappropriateCount

    };

    var blogId = id;

    return Blog.findByIdAndUpdate(blogId, { $set: newBlog }, { new: true });
}

function deleteById(id) {
    return Blog.findByIdAndRemove(id);
}


module.exports = blogDao;

