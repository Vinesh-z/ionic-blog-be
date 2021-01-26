const categoryService = require('../service/category.service');

var categoryController = {
    getAllCategories: getAllCategories,
    addCategory: addCategory
}

function unauthorizedResponse(res) {
    res.header('Unauthorized', 1);
    res.header("Access-Control-Expose-Headers", "Unauthorized");
    res.status(200).send({
        stat: "Unauthorized"
    });
}


function getAllCategories(req, res) {
    if (!(JSON.parse(req.permission)).category.read) {
        unauthorizedResponse(res);
    } else {
        categoryService.getAllCategories()
            .then((data) => { res.send(data); })
            .catch((error) => {
                console.log(error);
            });
    }
}

function addCategory(req, res) {
    if (!(JSON.parse(req.permission)).category.create) {
        unauthorizedResponse(res);
    } else {
        categoryService.addCategory(req.body)
            .then((data) => { res.send(data); })
            .catch((error) => { console.log(error); });
    }
}

module.exports = categoryController;