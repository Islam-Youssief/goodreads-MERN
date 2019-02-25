const mongoose = require('mongoose');

const userBookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    shelve: { type: 'String', enum: ['reading', 'will read', 'read'] },
    rate: Number,

});

const UserBook = mongoose.model('userBooks', userBookSchema);
module.exports = UserBook ;