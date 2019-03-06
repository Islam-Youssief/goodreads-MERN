const express = require('express');
const Review = require('../models/review');
const reviewRouter = express.Router();

reviewRouter.post('/', (req, res) => {
    const review = new Review({
        body: req.body.body,
        bookId: req.body.bookId,
        userId: req.body.userId
    });
    review.save((err) => {
        if (!err) {
            res.json({ msg: 'review saved' });
        } else {
            res.json({ msg: err });
        }
    });
});

reviewRouter.get('/:id', (req, res) => {
    Review.find({bookId: req.params.id}).populate('bookId').populate('userId').then(reviews => {
        res.json(reviews);
        console.log(reviews);
    }).catch(err => {
        res.json(err);
    });
});

reviewRouter.put('/:id', (req, res) => {
    Review.findOneAndUpdate(req.params.id, {
        body: req.body.body,
        userId: req.body.userId,
        bookId: req.body.bookId
    }).then((data) => {
        res.json(data, "updated")
    }).catch((err) => {
        res.json({ msg: err });
    });
});

reviewRouter.delete('/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id).then((data) => {
        res.json(data, "deleted ");

    }).catch((err) => {
        res.json({ msg: err });
    });
});

module.exports = reviewRouter;