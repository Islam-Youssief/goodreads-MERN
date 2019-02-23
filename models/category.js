const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String
});

const Category = mongoose.model('catogries', categorySchema);
module.exports = Category;

