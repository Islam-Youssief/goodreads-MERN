const express = require('express');
const app = express();
const Author = require('../models/author');
const Book = require('../models/book');
const authorRouter = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
    //add new book
    authorRouter.post('/',upload.single("photo"),function(req,res){
        console.log("Uploaded Successfull with filename : "+req.file.filename);
       
      
      const author = new Author({
        photo: req.file.path,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        description: req.body.description
    });
    author.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message: "Author Was Created Successfully..",
        });
    }).catch(err=>{
        console.log("You got an error : " + err);
        res.status(500).json({
          error: err
        });
    });
  })


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
 */
authorRouter.delete('/:id', (req, res) => {
    Author.findByIdAndRemove(req.params.id).then(() => {
        Book.findByIdAndRemove({ authorId: req.params.id }).then(() => {
            res.send('deleted');
        });
    }).catch(() => {
        res.send('Error while deletting data ' + err);

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
