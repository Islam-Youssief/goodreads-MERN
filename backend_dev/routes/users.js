const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
const passport = require('passport');



/**
 * Load User model
 */
const User = require('../models/user');
const books = require('../models/userBook');

/**
 * Return all the users
 */

router.get('/', (req, res) => {
    User.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send('Error while getting data');
    });

});

/**
 * Signup router
 */
router.post('/signup', (req, res) => {
    // also we will check on spaces using trim 
    req.checkBody('firstName', 'First name must be specified.').notEmpty();
    req.checkBody('lastName', 'Last name must be specified.').notEmpty();
    req.checkBody('userName', 'User name must be specified.').notEmpty();
    req.checkBody('password', 'Password must be specified.').notEmpty();
    req.checkBody('email', 'email must be specified.').notEmpty();
    req.checkBody('email', 'Choose a valid email').isEmail();
    req.checkBody('firstName','First name must be at least 3 character.').isLength({ min: 3, max: 8 });
    req.checkBody('lastName', 'Last name must be at least 3 character.').isLength({ min: 3, max: 8 });
    req.checkBody('userName', 'User name must be at least 3 character.').isLength({ min: 3, max: 8 });
    req.checkBody('password', 'Password must be at least 8 character.').isLength({ min: 8 });
    // req.checkBody('firstName', 'Numbers are not allowed.').isNumeric();
    // req.checkBody('lasttName', 'Numbers are not allowed.').isNumeric();

    const errors = req.validationErrors(req);
    if (errors) {
        console.log("Error while signup new user");
        res.json(errors);
        return;
    } 
    else
     {
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
            } else {
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password
                });
                /**
                * Generating salt to password
                */
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err)
                            res.json({ err: err });
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });


    }

});

/**
 * login router
 */
router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    req.checkBody('email', 'Email is required !').notEmpty();
    req.checkBody('email', 'Email is not correct !').isEmail();
    req.checkBody('password', 'Password is required !').notEmpty();
    
    const errors = req.validationErrors(req);
    if (errors) {
        console.log("Error while Login ..");
        res.json(errors);
        return;
    } 
    else
    {
        User.findOne({ email: email })
        .then(user => {
            if (!user) 
                res.status(404).json({ email: 'Email is not registered' });
            else 
            {
                bcrypt.compare(password, user.password)
                    .then(isMached => {
                        if (isMached)
                        {
                            const info = {
                                _id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                userName: user.userName,
                                email: user.email,
                                photo: user.photo
                            };

                            jwt.sign(info, keys.tokenKey, { expiresIn: 3600 }, (err, token) => {
                                if (!err) {
                                    res.json({ token: "Bearer " + token });
                                } else {
                                    res.json({ err: err });
                                }
                            });
                        } 
                        else
                            res.status(400).json({ password: 'password is not correct' });             
                    })
            }
        });
    }
});


/**
 * Admin router 
 */
router.get('/admin', passport.authenticate('jwt', {session: false}), (req, res)=>{

    const loginUser = {
        _id: req.user._id,
        firstName: req.user.firstName, 
        lastName: req.user.lastName,
        userName: req.user.userName,
        email: req.user.email,
        photo: req.user.photo,
        isAdmin: req.user.isAdmin, 

    }
    res.json(loginUser);
})
 

router.get('/admin/books', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        books.find().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.send('Error in getting data');
        })

    });
module.exports = router;


