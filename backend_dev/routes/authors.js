const express = require('express');
const app = express();
const authorRouter = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');

const bodyParser = require('body-parser');
const passport = require('passport');
const UserBook = require('../models/userBook');
const Review = require('../models/review');
const multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });

/**
 * Return all the Authors
 */
authorRouter.get('/', (req, res) => {
    Author.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send('Error while getting Author info');
    });

});

    
/**
 * Adding a new Author
 */
let upload=multer({dest:"public/uploads/"});
authorRouter.post('/admin/author', passport.authenticate('jwt', { session: false }), upload.single('photo'), (req, res, next) => {
    console.log("Uploaded Successfull with filename : "+req.file.filename);

    if(req.user.isAdmin != true){
        return res.status(400).json({ msg: 'You don`t have Access' });
    }       
     req.checkBody('firstName', 'firstName must exists.').isEmpty();
     req.checkBody('lastName', 'lastName must exists').notEmpty();
     req.checkBody('firstName', 'firstname requries no number.').isNumeric();
     req.checkBody('lastName', 'lastname requries no number.').isNumeric();

    const errors = req.validationErrors(req);

    if (errors){
        res.json(errors);
        return;
    }
    else{
        Author.findOne({ firstName: req.body.firstName, lastName: req.body.lastName }).then(author => {

            if (author) {
                return res.status(400).json({ name: 'Your Author is already exists !' });
            }
            else{
                const author = new Author({
                    photo: req.body.photo || '',
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    dateOfBirth: req.body.dateOfBirth,
                    description: req.body.description || '',
                });

                author.save().then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "Author Was Created Successfully..",
                    });
                }).catch(err => {
                    console.log("You got an error : " + err);
                    res.status(500).json({error: err})
                    });
            }
        })
    }
});


/**
 * Return Author with a specific id
 */
authorRouter.get('/:id', (req, res) => {
    Author.findById(req.params.id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send('Error While getting data : ' + err);
    });
});

/**
 * Update Author using a specific id
 */
authorRouter.put('/:id', (req, res) => {
    Author.findOneAndUpdate(req.params.id, {
        photo: req.body.photo,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        description: req.body.description
    }).then(() => {
        res.send('updated')
    }).catch((err) => {
        res.send('Error While updatting data' + err);
    });

});


/**
 * Delete Author with a specific id
 * Athorization - get (author - book - userbook - review )
 */
authorRouter.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    if(req.user.isAdmin != true)
        return res.status(400).json({ msg: 'You don`t have Access' });
    
    Author.findByIdAndRemove(req.params.id).then(() => {
    let authorID = req.params.id;
    Book.find({authorId: authorID}).then((book)=>{
        let BookID = book.bookId;
        Book.findByIdAndRemove(BookID).then(()=>{
            UserBook.remove({bookId:BookID}).then(()=>{
                Review.remove({bookId:BookID}).then(()=>{
                    res.json({msg: 'Author and dependices were deleted successfully..'});
                })
            })
        })
    })
}).catch(() => {
    res.send('error in delete data ' + err);
});
});

/**
 * Return books of a specific Author
 */
 authorRouter.get('/:id/books', (req, res) => {
    Book.find({ authorId: req.params.id }).then((books) => {
        res.send(books);
    }).catch((err) => {
        res.send('Error while getting data ' + err);
    });
});

module.exports = authorRouter;
