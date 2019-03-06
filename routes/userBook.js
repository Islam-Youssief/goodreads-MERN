const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const userBook = require('../models/userBook');
const passport = require('passport');
const userBookRouter = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * User control his shelves (No need to use jwt)
 */
userBookRouter.post('/', (req, res) => {
    const newUserBook = new userBook({
        bookId: req.body.bookId,
        userId: req.body.userId,
        shelve: req.body.shelve,
        rate: req.body.rate
    });
    newUserBook.save((err) => {
        if (!err) 
            res.json({ msg: 'Inserted your data successfuly..' });
        else 
            res.json({ msg: err });
    });
});

/**
 * User gets his shelves (No need to use jwt)
 */
userBookRouter.get('/', (req, res) => {
    userBook.find().populate('bookId').populate('userId').then(userBook => {
        res.json(userBook);
    }).catch(err => {
        res.json(err);
    });
});

/**
 * user update his shelves of specific books 
 */
userBookRouter.put('/:id', (req, res) => {
    userBook.findOneAndUpdate(req.params.id, {
        userId: req.body.userId,
        bookId: req.body.bookId,
        shelve: req.body.shelve,
        rate: req.body.rate
    }).then((data) => {
        res.json(data, "updated")
    }).catch((err) => {
        res.send('Error while getting data');
    });
});

/**
 * Delete books of user
 */
userBookRouter.delete('/:id', (req, res) => {
    userBook.findByIdAndRemove(req.params.id).then((data) => {
        res.json(data, "deleted ");
    }).catch((err) => {
        res.json({ msg: err });
    });
});

module.exports = userBookRouter;