const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
const passport = require('passport');


// Load User model
const User = require('../models/user');
const books = require('../models/userBook');

// @route   GET /users/signup
// @desc    signup user
// @access  Public

//get all users
router.get('/', (req, res) => {
    User.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send('error in getting data');
    });

});

router.get('/:id', (req, res) => {
    User.findById(req.params.id).populate('authorId').populate('categoryId').then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ msg: err });
    });
});

router.post('/signup', (req, res) => {

    req.checkBody('firstName', 'First name must be specified.').notEmpty();
    req.checkBody('firstName', 'First name must be at least 3 character.').isLength({ min: 3 });
    req.checkBody('firstName', 'First name mustn\'t be contain special charachter .').isAlphanumeric();
    // req.checkBody('firstName', 'First name mustn\'t be contain numbers .').isNumeric();
    // =================
    req.checkBody('lastName', 'Last name must be at least 3 character.').isLength({ min: 3 });
    req.checkBody('lastName', 'Last name must be specified.').notEmpty();
    req.checkBody('lastName', 'Last name mustn\'t be contain special charachter .').isAlphanumeric();
    // req.checkBody('lastName', 'Last name mustn\'t be contain numbers .').isNumeric();

    // ========================
    req.checkBody('password', 'Password must be specified.').notEmpty();
    req.checkBody('password', 'Password must be at least 8 character.').isLength({ min: 8 });

    req.checkBody('email', 'email must be specified.').notEmpty();
    req.checkBody('email', 'email must be valied email.').isEmail();

    // sanitizeBody('firstName').trim().escape();
    // sanitizeBody('lastName').trim().escape();
    // sanitizeBody('userName').trim().escape();

    const errors = req.validationErrors(req);
    if (errors) {
        console.log("error in sign up page .!!")
        res.json(errors);
        return;
    } else {
        console.log("1");
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
            } else {
                console.log("2");
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    // userName: "req.body.userName",
                    email: req.body.email,
                    password: req.body.password,
                    selectedBooks: [],
                });
                console.log("3");
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err)
                            res.json({ err: err });
                        newUser.password = hash;
                        console.log("4");
                        console.log(newUser);
                        newUser.save()
                            .then(user => {
                                console.log("5")
                                res.json(user);
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// @route   GET /users/login
// @desc    login user
// @access  Public
router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    req.checkBody('email', 'Email is required !').notEmpty();
    req.checkBody('email', 'Email is incorrect !').isEmail();
    req.checkBody('password', 'Password is required !').notEmpty();

    const errors = req.validationErrors(req);
    if (errors) {
        console.log("error in Log in page .!!");
        res.json(errors);
        return;
    } else {
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    res.status(404).json({ email: 'email not found' });
                } else {
                    bcrypt.compare(password, user.password)
                        .then(isMached => {
                            if (isMached) {
                                //if user mached lets creat the token
                                //create the payload
                                const payload = {
                                    _id: user._id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    // userName: user.userName,
                                    email: user.email,
                                    photo: user.photo
                                };

                                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                    if (!err) {
                                        res.json({
                                            token: "Bearer " + token,
                                            name: user.firstName +" "+user.lastName,
                                            currentUser: user,
                                        });
                                    } else {
                                        res.json({ err: err });
                                    }
                                });
                                //res.json({msg: 'success'});
                            } else {
                                res.status(400).json({ password: 'password incorrect' });
                            }
                        })
                }
            });
    }
});


// @route   GET /users/current
// @desc    get the current user
// @access  private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {


    const currentUser = {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        // userName: req.user.userName,
        email: req.user.email,
        photo: req.user.photo,
        isAdmin: req.user.isAdmin,

    }
    res.json(currentUser);
})

router.get('/current/books', passport.authenticate('jwt', { session: false }),
    (req, res) => {

        // db.inventory.find( { status: "A" }, { item: 1, status: 1, _id: 0 } )

        books.find().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.send('error in getting data');
        })

    });

router.put('/current/books', passport.authenticate('jwt', { session: false }),
    (req, res) => {

        let neWselectedBooks = req.user.selectedBooks;

        const newBook = {
            bookId: req.body.bookId,
            rate: req.body.rate || 0,
            shelve: req.body.readingStatus,
        };
        console.log(newBook);
        console.log("------------------------------------");
        console.log(neWselectedBooks);
        let flag = false;
        neWselectedBooks.map((book) => {
            if (book.bookId.equals(newBook.bookId)) {
                book.shelve = newBook.shelve;
                flag = true;
            }
        });
        console.log(neWselectedBooks);
        if (!flag) {
            neWselectedBooks.push(newBook);
        }

        User.findByIdAndUpdate(req.user.id, {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            password: req.user.password,
            photo: req.user.photo,
            isAdmin: req.user.isAdmin,
            selectedBooks: neWselectedBooks,
        }).then((data) => {
            res.json(neWselectedBooks)
        }).catch((err) => {
            res.json({msg: err});
        });

    });
// authorRouter.get('/', (req, res) => {
//     Author.find().then((data) => {
//         res.json(data);
//     }).catch((err) => {
//         res.send('error in getting data');
//     });

// });

// findOne({userId : req.user._id},
//     {photo:1,name:1,categoryId:0,authorId:0,rate:1}),        
// _id: req.user._id,
// firstName: req.user.firstName, 
// lastName: req.user.lastName,
// userName: req.user.userName,
// email: req.user.email,
// photo: req.user.photo,
// isAdmin: req.user.isAdmin, 

//     }
//     res.json(currentUserBooks);
// })




module.exports = router;
