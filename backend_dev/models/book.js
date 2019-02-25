const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    photo:String,
    name : String,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Author"
    },
});

const Book = mongoose.model('books', bookSchema);
module.exports = Book;
