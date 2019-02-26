const express = require('express');
const app = express();
const Book = require('../models/book');
const userBook = require('../models/userBook');
const bookRouter = express.Router();
 const multer = require('multer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

/**
 * Return all books
 */
bookRouter.get('/', (req, res) => {
    Book.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ msg: err });
    });
});

let upload=multer({dest:"public/uploads/"});

/**
 * Adding a new book
 */
bookRouter.post('/',upload.single("photo"),function(req,res){
    console.log("Uploaded Successfull with filename : "+req.file.filename);
     
    const book = new Book({
        photo: req.file.path,
        name: req.body.name,
        categoryId: req.body.categoryId,
        authorId: req.body.authorId,
        rate: req.body.rate
    });
    book.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Created book successfully",
        });
    }).catch(err => {
        console.log("You got error while creating : " + err);
        res.status(500).json({
            error: err
        });
    });

});

/**
 * Get books of specific id
 */
bookRouter.get('/:id', (req, res) => {
    Book.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ msg: err });
    });
});

/**
 * Updating book with a specific id 
 */
bookRouter.put('/:id', (req, res) => {
    Book.findOneAndUpdate(req.params.id, {
        photo: req.body.photo,
        name: req.body.name,
        categoryId: req.body.categoryId,
        authorId: req.body.authorId,
        rate: req.body.rate
    }).then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json({ msg: err });
    });

});

/**
 * Deleting a book with a specific id
 */
bookRouter.delete('/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id).then((data) => {
        res.json(data);

    }).catch((err) => {
        res.json({ msg: err });
    });
});

/**
 * Return All the books with a specific id
 */
bookRouter.get('/:id/user', (req, res) => {
    Book.find({ userId: req.params.id }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ msg: err });
    });
});

module.exports = bookRouter;