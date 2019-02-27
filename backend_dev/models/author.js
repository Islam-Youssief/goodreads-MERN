const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    photo: { type: String ,required: true},
    firstName: { type: String,required: true },
    lastName: { type: String ,required: false},
    dateOfBirth: { type: Date ,required: false},
    description: { type: String ,required: false}
});

const Author = mongoose.model('authors', authorSchema);
module.exports = Author;