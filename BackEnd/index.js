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
const uri = keys.mongoURI;
const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = mongoose.model('users');

const PORT = process.env.PORT || 4000;
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
// app.use('/uploads', express.static('uploads'));

app.use('/resources/uploads', express.static('resources/uploads'));
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

/**
 * start connection to database
 * */
mongoose.connect(uri, {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
}, (err) => {
    if (!err) 
        console.log(`\tStarted Connection to MongoATLAS ..`);
    	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
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
 const BookModel = require('./models/book');
app.post('/search', async (req, res) => {
    let booksData = [];
  
    BookModel.find({"name": {"$regex": req.body.searchValue, "$options": "i"}},
        function (err, data) {
            booksData = data;
        }).then(async () => {
                 res.json({
                    'matchedBooks': booksData
                });
            })
});
    

// app.post('/search', async (req, res) => {
//     // console.log(req.body.searchValue);
//     let booksData = [];
//     let authorsData = [];
//     let categoriesData = [];

//     BookModel.find({"name": {"$regex": req.body.searchValue, "$options": "i"}},
//         function (err, data) {
//             booksData = data;
//         }).then(() => {
//             AuthorModel.find().then(data => {
//             authorsData = data.filter((d) => {
//                 console.log((d.firstName + " " + d.lastName).search(req.body.searchValue) != -1);
//                 return (d.firstName + " " + d.lastName).search(req.body.searchValue) != -1;
//             });
//             console.log(authorsData);
//         }).then(() => {
//             CategoryModel.find({"name": {"$regex": req.body.searchValue, "$options": "i"}},
//                 function (err, data) {
//                     categoriesData = data;
//                     console.log(categoriesData);
//                 }).then(async () => {
//                 await res.json({
//                     'matchedBooks': booksData,
//                     'matchedAuthors': authorsData,
//                     'matchedCategories': categoriesData,
//                 });
//             })
//             });
//     })

    // console.log(authorsData);

// });



/**
 * Switching on the server
 */
app.listen(PORT, (req, res) => {
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(`\tServer Is Running On Port:  ${PORT}`);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
});
        