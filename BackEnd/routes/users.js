const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');


const User = require('../models/user');


/**
 * Return all the users
 */
router.get('/', (req, res) => {
    User.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send('Error');
    });
});

/**
 * Get specific user
 */
router.get('/:id', (req, res) => {
    User.findById(req.params.id).populate('authorId').populate('categoryId').then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ msg: err });
    });
});

/**
 * Signup router
 */
router.post('/signup', (req, res) => {
    
    req.checkBody('firstName', 'First name must be specified.').notEmpty();
    req.checkBody('lastName', 'Last name must be specified.').notEmpty();
    req.checkBody('password', 'Password must be specified.').notEmpty();
    req.checkBody('email', 'email must be specified.').notEmpty();
    req.checkBody('email', 'Choose a valid email').isEmail();
    req.checkBody('firstName','First name must be at least 4 character.').isLength({ min: 4});
    req.checkBody('lastName', 'Last name must be at least 4 character.').isLength({ min: 4});
    req.checkBody('password', 'Password must be at least 8 character.').isLength({ min: 8 });
    
    const errors = req.validationErrors(req);
    if (errors) {
        console.log("Error while signup new user");
        return res.json(errors);
        
    } 
    else
     {
        User.findOne({ email: req.body.email }).then(user => {
            if (user) 
                return res.status(400).json({ email: 'Email already exists' });
            else 
            {
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    selectedBooks: [],
                });
                /**
                * Generating salt to password
                */
                bcrypt.genSalt(15, (err, salt) => {
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
        return res.json(errors);
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
                                email: user.email,
                                photo: user.photo
                            };

                            jwt.sign(info, keys.tokenKey, { expiresIn: 3600 },(error, token) => {
                            if (!error) {
                                res.json({
                                    token: "Bearer " + token,
                                    name: user.firstName +" "+user.lastName,
                                    currentUser: user,
                                });
                            } 
                            else 
                                res.json({ err: err });
                        });
                        } 
                        else
                            res.status(400).json({ password: 'password is not correct' });             
                    })
            }
        });
    }
});

module.exports = router;