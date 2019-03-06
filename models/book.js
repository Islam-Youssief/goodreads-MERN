const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    photo:{type:String},
    name : {type:String},
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"catogries"
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"authors"
    },
    rate: {
        type: Number,
        default: 0
    },
});

const Books = mongoose.model('books', bookSchema);
module.exports = Books;
