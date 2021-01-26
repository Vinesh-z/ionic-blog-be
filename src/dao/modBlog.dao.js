var ModBlog = require('../model/moderatorBlog');
var ObjectId = require('mongoose').Types.ObjectId;
var modblogDao = {
    create: create,
    update: update,
    deleteById: deleteById,
    findOne: findOne,
    findModBlogs: findModBlogs,
    findByUserId: findByUserId
};

function create(blog) {
    var newBlog = new ModBlog(blog);
    return newBlog.save();
}

function findByUserId(userId) {
    var orderBy = { createdAt: -1 };
    return ModBlog.find({ author: { $elemMatch: { "_id": userId } } }).sort(orderBy);
}

function findOne(id) {
    return ModBlog.findById({ _id: id });
}

function findModBlogs() {
    var orderBy = { createdAt: -1 };
    return ModBlog.find({ "status": { "$in": "pending" } }).sort(orderBy);
}

function update(blog, id) {
    var newBlog = {
        blogName: blog.blogName,
        gadgetName: blog.gadgetName,
        content: blog.content,
        status: blog.status,
        reason: blog.reason,
        tags: blog.tags,
        imageUrl: blog.imageUrl,
        __v: blog.__v,
    };

    var blogId = id;

    return ModBlog.findByIdAndUpdate(blogId, { $set: newBlog }, { new: true });
}

function deleteById(id) {
    return ModBlog.findByIdAndRemove(id);
}


module.exports = modblogDao;

