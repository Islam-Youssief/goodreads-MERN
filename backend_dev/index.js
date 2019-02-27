const express = require('express');
const expressValidator=require('express-validator');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./configs/keys');
const autherRouter = require('./routes/authors');
const categoryRouter = require('./routes/categories');
const userRouter = require('./routes/users');
const bookRouter = require('./routes/book');
const app = express();
const uri = keys.mongoURI;
const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = mongoose.model('users');
const PORT = process.env.PORT || 5000;

mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/uploads', express.static('uploads'));
mongoose.Promise = global.Promise;

/**
 * start connection to database
 * */
mongoose.connect(uri, {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log("started mongodb connection");
    }
});

/**
 * Setting passport getway 
 */
app.use(passport.initialize());
const stategy = passportJWT.Strategy;
const passportExtraction = passportJWT.ExtractJwt;
/**
 * prepaire the options
 */
const opt = {
    jwtFromRequest: passportExtraction.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.tokenKey
}

/**
 * using the passport
 */
passport.use(new stategy(opt, (info, verify)=>{
    User.findById(info._id)
        .then(user=>{
            if(user)
                return verify(null, user);
            
            else
                return verify(null, false);
            
        })
        .catch(error=>{
            console.log(error);
        });

}));

/**
 * Categories router
 **/
app.use('/categories', categoryRouter);

/**
 * Books router
 **/
app.use('/books', bookRouter);

/**
 * Authors router
 **/
app.use('/authors', autherRouter);

/**
 * Users router
 * */
app.use('/users', userRouter);

app.listen(PORT, (req, res) => {
    console.log(`Server Is Running On Port:  ${PORT}`);
});
