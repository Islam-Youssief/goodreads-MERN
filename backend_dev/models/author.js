const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    photo: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    description: { type: String }
});

const Author = mongoose.model('authors', authorSchema);
module.exports = Author;