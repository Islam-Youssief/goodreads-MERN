const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
const User = require('../models/user');
/**
 * Admin Authorization
 */
router.post('/', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    req.checkBody('email', 'Enter your email ya Admin').notEmpty();
    req.checkBody('password', 'Enter your password ya Admin').notEmpty();
    req.checkBody('email', 'Make sure of to enter your email ..').isEmail();
    const errors = req.validationErrors(req);
    if (errors) 
        return res.json(errors);
    else {
        User.findOne({ email: email })
            .then(user => {
                if (!user) 
                    res.status(404).json({ email: 'email not found' });
                else
                {
                    if (user.isAdmin) {
                        bcrypt.compare(password, user.password)
                        .then(isMached => {
                            if (isMached) 
                            {
                                const info = {
                                    _id: user._id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    photo: user.photo,
                                    isAdmin: user.isAdmin
                                };

                                jwt.sign(info, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                    if (!err)
                                        res.json({ token: "Bearer " + token });
                                    else {
                                        console.log("You can't hack this website");
                                        console.log("You Are Not Authorized to access the site ! ");
                                        res.json({ err: err });
                                    }
                                });
                            }
                            else 
                                res.status(400).json({ password: 'Enter Your password ya admin..' });
                            
                            })
                    }
                    else
                        res.json({ msg: "You Are Not Authorized to access the site ! " });                    
                }
            });
    }
});

module.exports = router;