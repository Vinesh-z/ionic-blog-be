var Category = require('../model/category');
var ObjectId = require('mongoose').Types.ObjectId;
var categoryDao = {
    create: create,
    findAll: findAll
}
  


function create(category) {

    var newCategory = new Category(category);
    return newCategory.save();

}

function findAll() {
    return Category.find({});
}
module.exports = categoryDao;