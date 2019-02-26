const express = require('express');
const userBookRouter = express.Router();


//get all books on one shelf
userBookRouter.get('/:id/:shelf', (req, res) => {
    userBook.find({ userId: req.params.id, shelve: req.params.shelf }).populate('Book').
    exec(function (err, data) {
      if (err) {
        res.json({ msg: err });
      }
      res.json(data);
      
    });
});


//add  new books to one shelf
userBookRouter.post('/', (req, res) => {
    if(userBook.find({
        userId: req.body.userId,
        shelve : req.body.shelf,
        bookId :req.body.bookId,
    }).count() > 0){
        res.json({msg: "record exist"});
    }
    else{
        const userBook = new userBook({
            userId: req.body.userId,
            shelve : req.body.shelf,
            bookId :req.body.bookId,
        });
        category.save((err) => {
            if (!err) {
                res.json({msg: 'saved AND Success..'});
            }else{
                res.json({msg: err});
            }
    
        });
    }
    
});


// update shelf by id
userBookRouter.patch('/:id', (req, res) => {
    userBook.updateOne({_id: req.params.id},{ $set: { shelve : req.body.shelf,
        bookId :req.body.bookId },}).then(() => {
        res.json({msg: 'updated'})
    }).catch((err) => {
        res.json({msg: err});
    });
});




module.exports = userBookRouter;
