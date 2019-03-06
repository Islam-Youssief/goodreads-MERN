const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
// const passport = require('passport');
const User = require('../models/user');

router.post('/', (req, res) => {

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
                    if (user.isAdmin) {
                        bcrypt.compare(password, user.password)
                            .then(isMached => {
                                if (isMached) {
                                    //if user mached lets creat the token
                                    //create the payload
                                    const payload = {
                                        _id: user._id,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        userName: user.userName,
                                        email: user.email,
                                        photo: user.photo,
                                        isAdmin: user.isAdmin
                                    };

                                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                        if (!err) {
                                            res.json({ token: "Bearer " + token });
                                        } else {
                                            console.log("not admin")
                                            res.json({ err: err });
                                        }
                                    });
                                    //res.json({msg: 'success'});
                                } else {
                                    res.status(400).json({ password: 'password incorrect' });
                                }
                            })
                    } else {
                        res.json({ msg: "unauthoraized" });
                    }
                }

            });
    }


});

module.exports = router;
