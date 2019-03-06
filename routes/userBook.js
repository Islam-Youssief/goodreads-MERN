const express = require('express');
const userBook = require('../models/userBook');
const userBookRouter = express.Router();

userBookRouter.post('/', (req, res) => {
    const newUserBook = new userBook({
        bookId: req.body.bookId,
        userId: req.body.userId,
        shelve: req.body.shelve,
        rate: req.body.rate
    });
    newUserBook.save((err) => {
        if (!err) {
            res.json({ msg: 'data saved' });
        } else {
            res.json({ msg: err });
        }
    });
});
userBookRouter.get('/', (req, res) => {
    userBook.find().populate('bookId').populate('userId').then(userBook => {
        res.json(userBook);
        console.log(userBook);
    }).catch(err => {
        res.json(err);
    });
});
userBookRouter.put('/:id', (req, res) => {
    userBook.findOneAndUpdate(req.params.id, {
        userId: req.body.userId,
        bookId: req.body.bookId,
        shelve: req.body.shelve,
        rate: req.body.rate
    }).then((data) => {
        res.json(data, "updated")
    }).catch((err) => {
        res.json({ msg: err });
    });
});
userBookRouter.delete('/:id', (req, res) => {
    userBook.findByIdAndRemove(req.params.id).then((data) => {
        res.json(data, "deleted ");

    }).catch((err) => {
        res.json({ msg: err });
    });
});


module.exports = userBookRouter;