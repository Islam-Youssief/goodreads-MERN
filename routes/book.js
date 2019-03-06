const express = require('express');
const Book = require('../models/book');
const Category = require('../models/category');
const Author = require('../models/author');

const UserBook = require('../models/userBook');
const Review = require('../models/review');

const bookRouter = express.Router();

const multer = require('multer');

const passport = require('passport');


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

//get all books
bookRouter.get('/', (req, res) => {
    Book.find().populate('authorId').populate('categoryId').then((data) => {

        res.json(data);
      
    }).catch(err => {
        console.log(err);
    })

});

//add new book
//
bookRouter.post('/', passport.authenticate('jwt', { session: false }),
    upload.single('photo'), (req, res) => {


    if(req.user.isAdmin != true){
        return res.status(400).json({ msg: 'UnAthorized Access' });
    }

    Category.findById(req.body.categoryId).then(category => {
        if (!category) {
            return res.status(400).json({ categoryName: 'this category dose not exiest' });
        }
    
        Author.findOne({ authorName: req.body.authorName }).then(author => {
            if (!author) {
                return res.status(400).json({ email: 'this Author dose not exiest' });
            }
            let p = 'uploads/2019-03-02T07:43:02.236Zbook.jpg'
            if(req.file)
            {
               p = req.file.path;
            }
        const book = new Book({
           photo: p,
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
        console.log("err : " + err);
        res.status(500).json({
            error: err
        });
    });
        });
    });

});
//get book by id
bookRouter.get('/:id', (req, res) => {
    Book.findById(req.params.id).populate('authorId').populate('categoryId').then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ msg: err });
    });
});

// update book by id
bookRouter.put('/:id', passport.authenticate('jwt', { session: false }), upload.single('photo'), (req, res) => {

    if(req.user.isAdmin != true){
        return res.status(400).json({ msg: 'UnAthorized Access' });
    }
    let path = null;
    if(req.file)
    {
        path = req.file.path;
    }
    Book.findByIdAndUpdate(req.params.id, {
        photo: path,
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

//delete book by id
bookRouter.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.isAdmin != true) {
        return res.status(400).json({msg: 'UnAthorized Access'});
    }

    // Book.pre('remove',function(next){
    //     UserBook.remove({bookId: this._id}).exec();
    //     Review.remove({bookId: this._id}).exec();
    //     next();
    // }).catch((err) => {
    //     res.json({msg: err});
    // });
    Book.findByIdAndRemove(req.params.id).then((data) => {
        console.log("line 130 remove book");
        let BookID = data.bookId;
        UserBook.remove({bookId:BookID}).then(()=>{
            console.log("line 153 remove user book");
            Review.remove({bookId:BookID}).then(()=>{
                console.log("line 135 remove review");
                res.json({msg: 'deleted'});
            })
        })
        }).catch((err) => {
        res.json({msg: err});
    });
});

module.exports = bookRouter;