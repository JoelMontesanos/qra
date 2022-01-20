const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
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

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/qr.routes'));

//Global Variables


//Static files
app.use(express.static(path.join(__dirname,'public')));

//Exports
module.exports = app;