const express = require('express');
const expressValidator=require('express-validator');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./configs/keys');
/**
 * Loading all the routes
 */
const autherRouter = require('./routes/authors');
const categoryRouter = require('./routes/categories');
const userRouter = require('./routes/users');
const bookRouter = require('./routes/book');
const userBook = require('./routes/userBook');
const adminRouter = require('./routes/admin');
const reviewRouter = require('./routes/review');
/**
 * Loading all the models
 */

const BookModel = require('./models/book');
const AuthorModel = require('./models/author');
const CategoryModel = require('./models/category');


const app = express();
const uri = keys.mongoURI;
const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = mongoose.model('users');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
app.use(cors());

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
        console.log(`Starting Connection to MongoATLAS ..`);
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
passport.use(new stategy(opt, (info, is_user)=>{
    User.findById(info._id)
        .then(user=>{
            if(user)
                return is_user(null, user);
            
            else
                return is_user(null, false);
            
        })
        .catch(error=>{
            console.log("Error While verifying the user");
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
 * Reviews router
 **/
app.use('/review', reviewRouter);
/**
 * Admin router
 **/
app.use('/admin', adminRouter);
/**
 * Users router
 * */
app.use('/users', userRouter);
/**
 * User books
 */
app.use('/userBook', userBook);
/**
 * Search by book name route
 */
app.use('/:name/search',bookRouter);
/**
 * Switching on the server
 */
app.listen(PORT, (req, res) => {
    console.log(`Server Is Running On Port:  ${PORT}`);
});
