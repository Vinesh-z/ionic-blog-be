const mongoose = require('mongoose');
var CategorySchema = new mongoose.Schema({
    
    categoryName: {
        type: String
    }
});

module.exports = mongoose.model('Category', CategorySchema);