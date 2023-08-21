const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const { renderQrForm } = require('./controllers/qr.controller');
const passport = require('passport');
require ('./config/passport');

//initialization
const app = express();

//Setting
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname ,'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts' ),
    partialsDir: path.join(app.get('views'), 'partials' ),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'jesica',
    resave:true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    console.log('Este es req.user: '+req.user);
  next();
  });

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/qr.routes'));
app.use(require('./routes/users'));




//Static files
app.use(express.static(path.join(__dirname,'public')));

//Exports
module.exports = app;