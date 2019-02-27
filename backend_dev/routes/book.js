const app = express();
const bookRouter = express.Router();
const express = require('express');
const Book = require('../models/book');
const multer = require('multer');
const bodyParser = require('body-parser');
const Category = require('../models/category');
const Author = require('../models/author');
const UserBook = require('../models/userBook');
const Review = require('../models/review');

const multer = require('multer');
const passport = require('passport');
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/**
 * Return all books
 */
bookRouter.get('/', (req, res) => {
    Book.find().populate('authorId').populate('categoryId').then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })

});


let upload=multer({dest:"public/uploads/"});

/**
 * Adding a new book
 */
bookRouter.post('/', passport.authenticate('jwt', { session: false }), upload.single('photo'), (req, res) => {
    console.log("Uploaded Successfull with filename : "+req.file.filename);

        if(req.user.isAdmin != true)
            return res.status(400).json({ msg: 'You don`t have Access' });
        
        Category.findById(req.body.categoryId).then(category => {
            if (!category) 
                return res.status(400).json({ categoryName: 'You have requested Category that is not exist !' });
            
        Author.findOne({ authorName: req.body.authorName }).then(author => {
                if (!author) 
                    return res.status(400).json({ email: 'You have requested Author that is not exist!' });
                
            const book = new Book({
                photo: req.body.photo || 'No photo till the moment',
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
 * Get books of specific id
 */
bookRouter.get('/:id', (req, res) => {
    Book.findById(req.params.id).populate('authorId').populate('categoryId').then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ msg: err });
    });
});

/**
 * Updating book with a specific id 
 */
bookRouter.put('/:id', passport.authenticate('jwt', { session: false }), upload.single('photo'), (req, res) => {

    if(req.user.isAdmin != true)
        return res.status(400).json({ msg: 'You are unauthorized to access the site !' });

    Book.findOneAndUpdate(req.params.id, {
        photo: req.file.path,
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
        }).catch((err) => {
        res.json({msg: err});
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