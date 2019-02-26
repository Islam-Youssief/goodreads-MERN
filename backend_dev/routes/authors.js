const express = require('express');
const app = express();
const Author = require('../models/author');
const Book = require('../models/book');
const authorRouter = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//get all authors
authorRouter.get('/', (req, res) => {
    Author.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send('Error while in getting data');
    });

});

//add new author

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
            message: "Created author successfully",
        });
    }).catch(err=>{
        console.log("err : "+err);
        res.status(500).json({
          error: err
        });
    });
  })


//get author by id
authorRouter.get('/:id', (req, res) => {
    Author.findById(req.params.id).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send('Error while getting data');
    });
});

// update author by id
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
//delete author by id
authorRouter.delete('/:id', (req, res) => {
    Author.findByIdAndRemove(req.params.id).then(() => {
        Book.findByIdAndRemove({ authorId: req.params.id }).then(() => {
            res.send('deleted');
        });
    }).catch(() => {
        res.send('Error while deletting data ' + err);

    });
});
//get books of specific author 
authorRouter.get('/:id/books', (req, res) => {
    Book.find({ authorId: req.params.id }).then((books) => {
        res.send(books);
    }).catch((err) => {
        res.send('Error while getting data ' + err);
    });
});

module.exports = authorRouter;
