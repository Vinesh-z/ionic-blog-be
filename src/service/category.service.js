const categoryDao = require('../dao/category.dao');
var Promises = require('es6-promise').Promise;
var categoryService = {
    getAllCategories: getAllCategories,
    addCategory: addCategory
}

function getAllCategories() {
    return new Promises((resolve, reject) => {
        categoryDao.findAll().
            then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


function addCategory(category) {
    return new Promises((resolve, reject) => {
        categoryDao.create(category).
            then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
    });
}
module.exports = categoryService;