const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }
});

const Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;