const express = require('express');
const Author = require('../models/author');
const Book = require('../models/book');
const Category = require('../models/category');
const categoryRouter = express.Router();
const passport = require('passport');


/**
 * Return all categories
 */
categoryRouter.get('/', (req, res) => {
    Category.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({msg: 'Error while getting data'});
    });
});


/**
 * Add new category
 **/
categoryRouter.post('/admin/category', passport.authenticate('jwt', { session: false }),(req, res) => {
    if(req.user.isAdmin != true){
        return res.status(400).json({ msg: 'You are unauthorized to access the site !' });
    }

    req.checkBody('name', 'You must put a category name.').notEmpty();
    req.checkBody('name', 'Numberss are not allowed .').isNumeric();

    Category.findOne({name: req.body.name}).then(newcat => {
        if (newcat) {
            return res.status(400).json({name: 'category is already existed'});
        } else {
            const category = new Category({
                name: req.body.name
            });
            category.save((err) => {
                if (!err) 
                    res.json({msg: 'saved'});
                else 
                    res.json({msg: err});
                
            });
        }
    });
});

/**
 * Return all books of specific category
 */
categoryRouter.get('/:id', (req, res) => {

    Book.find({ categoryId: req.params.id }).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({msg: err});
    });    
});

/**
 * update category with specific id
 **/ 
categoryRouter.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    if(req.user.isAdmin != true)
        return res.status(400).json({ msg: 'You are unauthorized to access the site !' });
    
    Category.updateOne({_id: req.params.id},{ $set: { name: req.body.name },}).then(() => {
        res.json({msg: 'updated'})
    }).catch((err) => {
        res.json({msg: err});
    });
});

/**
 * Delete category with specific id 
 * make sure of authorization ->delete on sequence categoryId-> bookId->review
 */
categoryRouter.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if(req.user.isAdmin != true)
        return res.status(400).json({ msg: 'You are unauthorized to access the site !' });
    
    Category.findByIdAndRemove(req.params.id).then(() => {
            const categID = req.params.id;
            Book.find({categoryId: categID}).then((book)=>{
                const BookID = book.bookId;
                Book.findByIdAndRemove(BookID).then(()=>{
                    UserBook.remove({bookId:BookID}).then(()=>{
                        Review.remove({bookId:BookID}).then(()=>{
                            res.json({msg: 'Category deleted successfully ..'});
                        })
                    })
                })
            })
        }).catch(() => {
            res.json({msg: err});
        });
});


module.exports = categoryRouter;
