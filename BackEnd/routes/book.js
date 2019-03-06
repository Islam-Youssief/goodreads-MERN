const express = require('express');
const app = express();
const bookRouter = express.Router();
const Category = require('../models/category');
const Author = require('../models/author');
const UserBook = require('../models/userBook');
const Review = require('../models/review');
const Book = require('../models/book');
const multer = require('multer');
const bodyParser = require('body-parser');
const passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './resources/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') 
        cb(null, true);
    else 
        cb(null, false);
    
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
});

/**
 * Return all books
 */
bookRouter.get('/', (req, res) => {
    Book.find().populate('authorId').populate('categoryId').then((data) => {
        res.json(data);
    }).catch(err => {
        console.log("Error while returning all books!");
    })
});

/**
 * Adding a new book
 */
bookRouter.post('/', passport.authenticate('jwt', { session: false }), upload.single('photo'), (req, res) => {
    console.log("Now Checking on authorization and if this book is already exists ?");

    if(req.user.isAdmin != true)
        return res.status(400).json({ msg: 'You don`t have Access' });
    
    if (req.validationErrors(req))
        return res.json(errors);
        
    Category.findById(req.body.categoryId).then(category => {
        if (!category) 
            return res.status(400).json({ categoryName: 'You have requested Category that is not exist !' });
        
    Author.findOne({ authorName: req.body.authorName }).then(author => {
            if (!author) 
                return res.status(400).json({ email: 'You have requested Author that is not existed!' });
            
        const book = new Book({
            photo: req.file.path || 'No photo till the moment',
            name: req.body.name,
            categoryId: req.body.categoryId,
            authorId: req.body.authorId,
            rate: 0,
        });

    book.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Created book successfully",
        });
    }).catch(err => {
        console.log("You got error while creating : " + err);
        res.status(500).json({ error: err});
                    });
        });
    });
});

/**
 * Return All the books with a specific id
 */
bookRouter.get('/:id', (req, res) => {
    Book.findById(req.params.id).populate('authorId').populate('categoryId').then((data) => {
        res.json(data);
    }).catch((error) => {
        res.json({ msg: "Error while getting this book "+error });
    });
});

/**
 * Updating book with a specific id 
 */
bookRouter.put('/:id', passport.authenticate('jwt', { session: false }), upload.single('photo'), (req, res) => {

    if(req.user.isAdmin != true)
        return res.status(400).json({ msg: 'You are unauthorized to access the site !' });

    Book.findOneAndUpdate(req.params.id, {
        photo: req.file.path || 'No photo till the moment',
        name: req.body.name,
        categoryId: req.body.categoryId,
        authorId: req.body.authorId,
        rate: req.body.rate
    }).then((data) => {
        res.json(data)
    }).catch((error) => {
        res.json({ msg: "Error while updating this book "+error });
    });
});

/**
 * Deleting a book with a specific id
 * jwt -> bookId - userbooks - reviews
 */
bookRouter.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    if (req.user.isAdmin != true) 
        return res.status(400).json({ msg: 'You are unauthorized to access the site !' });
    
    Book.findByIdAndRemove(req.params.id).then((data) => {
        let BookID = data.bookId;
        UserBook.remove({bookId:BookID}).then(()=>{
            Review.remove({bookId:BookID}).then(()=>{
                res.json({msg: 'Book was deleted sucessfully plus it`s reviews.'});
            })
        })
        }).catch((error) => {
        res.json({msg: "Error while deleting this book "+error});
    });
});

/**
 * Search by book name
 */
// bookRouter.get('/:name/search', (req, res) => {
//     Book.find({ name: { $regex: '.*' + req.params.name + '.*' } }).then((data) => {
//         res.json(data);
//     }).catch((err) => {
//         res.json({ msg: err });
//     });
// });

module.exports = bookRouter;