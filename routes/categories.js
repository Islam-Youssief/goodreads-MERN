const express = require('express');
const Author = require('../models/author');
const Book = require('../models/book');
const Category = require('../models/category');
const categoryRouter = express.Router();


//get all categories
categoryRouter.get('/', (req, res) => {
    Category.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({msg: 'Error while getting data'});
    });
});


//add new category
categoryRouter.post('/', (req, res) => {
    const category = new Category({
        name: req.body.name
    });
    category.save((err) => {
        if (!err) {
            res.json({msg: 'saved AND Success..'});
        }else{
            res.json({msg: err});
        }

    });
});

//get all books from spacific category
categoryRouter.get('/:id', (req, res) => {

    Book.find({ categoryId: req.params.id }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({msg: err});
    });    
});

// update category by id
categoryRouter.patch('/:id', (req, res) => {
    Category.updateOne({_id: req.params.id},{ $set: { name: req.body.name },}).then(() => {
        res.json({msg: 'updated'})
    }).catch((err) => {
        res.json({msg: err});
    });
});


//delete category by id
categoryRouter.delete('/:id', (req, res) => {


    Category.findByIdAndRemove(req.params.id).then(() => {
        Book.findByIdAndRemove({ categoryId: req.params.id }).then(() => {
            res.json({msg: 'deleted'});
        });
    }).catch(() => {
        res.json({msg: err});
    });
});


module.exports = categoryRouter;
