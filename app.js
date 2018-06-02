var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
const bodyParser= require('body-parser');
const expressValidator= require('express-validator');
const flash= require('connect-flash');
const session=require('express-session');
const passport= require('passport');
const config= require('./config/database');



//mongoose.connect('mongodb://localhost/nodekb');
mongoose.connect(config.database);

let db=mongoose.connection;

db.once('open',function () {
    console.log('Connected to mongodb');
});


db.on('error',function (err) {
    console.log(err);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/add');

var app = express();

let Article= require('./models/article');
let Workshop= require('./models/workshop');
let Seminar= require('./models/seminar');
let Industryvisit= require('./models/industryvisit');
let Guest = require('./models/guest');
let Exam = require('./models/exam');
let Conference = require('./models/conference');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// bodyparser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));



// passport config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});



//app.use('/', indexRouter);

app.get('/',function (req,res) {
    Article.find({},function (err,articles) {
        if(err){
            console.log(err);
        }
        else{

            res.render('login', {
                title: 'login'
            });
        }


    });

});


app.get('/allarticle',ensureAuthenticated,function (req,res) {
    Article.find({},function (err,articles) {
        if(err){
            console.log(err);
        }
        else{

            res.render('index', {
                title: 'Articles',
                articles:articles
            });
        }


    });

});

app.get('/sidebar',ensureAuthenticated,function (req,res) {

            res.render('sidebar', {
                title: 'Sidebar',
            });

});



// for all workshops

app.get('/allworkshopatt',function (req,res) {
    Workshop.find({},function (err,workshops) {
        if(err){
            console.log(err);
        }
        else{

            res.render('workshopindex', {
                title: 'Workshop',
                workshops:workshops
            });
        }


    });

});

app.get('/allworkshopcon',function (req,res) {
    Workshop.find({},function (err,workshops) {
        if(err){
            console.log(err);
        }
        else{

            res.render('workshopindexcon', {
                title: 'Workshop',
                workshops:workshops
            });
        }


    });

});

// for all seminar
app.get('/allseminaratt',function (req,res) {
    Seminar.find({},function (err,seminars) {
        if(err){
            console.log(err);
        }
        else{

            res.render('seminarindex', {
                title: 'Seminar',
                seminars:seminars
            });
        }


    });

});


app.get('/allseminarcon',function (req,res) {
    Seminar.find({},function (err,seminars) {
        if(err){
            console.log(err);
        }
        else{

            res.render('seminarindexcon', {
                title: 'Seminar',
                seminars:seminars
            });
        }


    });

});


app.get('/alliv',function (req,res) {
    Industryvisit.find({},function (err,industryvisits) {
        if(err){
            console.log(err);
        }
        else{

            res.render('industryvisitindex', {
                title: 'Industrial Visit',
                industryvisits:industryvisits
            });
        }


    });

});

app.get('/allguestatt',function (req,res) {
    Guest.find({},function (err,guests) {
        if(err){
            console.log(err);
        }
        else{
            console.log('Guest rendering !!');
            res.render('guestindex', {
                title: 'guest lecture',
                guests:guests
            });
        }


    });

});

app.get('/allguestcon',function (req,res) {
    Guest.find({},function (err,guests) {
        if(err){
            console.log(err);
        }
        else{
            console.log('Guest rendering !!');
            res.render('guestindexcon', {
                title: 'guest lecture',
                guests:guests
            });
        }


    });

});


app.get('/allexam',function (req,res) {
    Exam.find({},function (err,exams) {
        if(err){
            console.log(err);
        }
        else{

            res.render('examindex', {
                title: 'exams conducted',
                exams:exams
            });
        }


    });

});


app.get('/allconference',function (req,res) {
    Conference.find({},function (err,conferences) {
        if(err){
            console.log(err);
        }
        else{

            res.render('conferenceindex', {
                title: 'conferences conducted',
                conferences:conferences
            });
        }


    });

});


let article= require('./routes/article');
let users= require('./routes/users');
let workshop= require('./routes/workshop');
let seminar= require('./routes/seminar');
let industryvisit=  require('./routes/industryvisit');
let guest= require('./routes/guest');
let exam= require('./routes/exam');
let conference= require('./routes/conference');


app.use('/article',article);
app.use('/users',users);
app.use('/workshop',workshop);
app.use('/seminar',seminar);
app.use('/industryvisit',industryvisit);
app.use('/guest',guest);
app.use('/exam',exam);
app.use('/conference',conference);


app.use('/add', usersRouter);

app.post('/add',ensureAuthenticated,function (req,res) {
    req.checkBody('title','Title is required !!').notEmpty();
    //req.checkBody('author','Author is required !!').notEmpty();
    req.checkBody('body','Body is required !!').notEmpty();

    let errors=req.validationErrors();
    if(errors){
        res.render('add',{
            title:'Add article',
            errors:errors
        });
    }
    else {

        let article= new Article();
        article.title=req.body.title;
        article.author=req.user._id;
        article.body=req.body.body;

        article.save(function (err) {
            if(err)
            {
                console.log(err);
                return;
            }
            else
            {
                req.flash('success','Article Added');
                res.redirect('/allarticle');
            }
        });
    }


});

/*
app.get('/workshop/:id',function (req,res) {
    Workshop.findById(req.params.id,function (err,workshop) {
            res.render('workshop', {
                workshop:workshop
            });

    });
});
*/



function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else {
        req.flash('danger','Please login');
        res.redirect('/users/login');
    }
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
