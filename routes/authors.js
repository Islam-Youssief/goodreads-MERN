const express = require('express');
const app = express();
const authorRouter = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');
const bodyParser = require('body-parser');
const passport = require('passport');
const multer = require('multer');

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
     limits: { fileSize: 1024 * 1024 * 5},
     fileFilter: fileFilter
 });

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
authorRouter.post('/', passport.authenticate('jwt', { session: false }), upload.single('photo'), (req, res, next) => {
    console.log("Uploaded Successfull with filename : "+req.file.filename);
    console.log("Now Checking on authorization and if this author is already exists ?");

    if(req.user.isAdmin != true)
        return res.status(400).json({ msg: 'You don`t have Access' });
    
    if (req.validationErrors(req))
        return res.json(errors);
        
    else{
        Author.findOne({ firstName: req.body.firstName, lastName: req.body.lastName }).then(author => {
    
        if (author) 
            return res.status(400).json({ name: 'Your Author is already exists !' });
        
        else{
            const author = new Author({
                photo: req.file.path || 'No photo till the moment',
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
authorRouter.put('/:id', passport.authenticate('jwt', { session: false }), upload.single('photo'), (req, res) => {
    
    if(req.user.isAdmin != true)
        return res.status(400).json({ msg: 'You don`t have Access' });
    
    if (req.validationErrors(req))
        return res.json(errors);
    
    Author.findOneAndUpdate(req.params.id, {
        photo: rreq.file.path,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        description: req.body.description
    }).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.send('Error While updatting data' + error);
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
    Book.remove({ authorId: req.params.id }).then(() => {
        res.json({msg: 'Author and dependices were deleted successfully..'});
        });
    }).catch(() => {
    res.send('Error While deleting Author');
});
});

/**
 * Return books of a specific Author
 */
 authorRouter.get('/:id/books', (req, res) => {
    Book.find({ authorId: req.params.id }).then((books) => {
        res.send(books);
    }).catch(() => {
        res.send('Error while getting data of this author');
    });
});

module.exports = authorRouter;
