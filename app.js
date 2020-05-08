require('dotenv').config();
const colors = require('colors');
const errorHandler = require('./middleware/error')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

connectDB().catch(console.error);


const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`
);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


// Express View engine setup

app.use(
  require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true,
  })
);



app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'TabledIn';

// Enable authentication using session + passport
app.use(
  session({
    secret: 'irongenerator',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(flash());
require('./passport')(app);

app.use(errorHandler);



const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/api/v2/auth', authRoutes);

const restaurantRoutes = require('./routes/restaurants');
app.use('/api/v2/restaurants', restaurantRoutes);

const bookingRoutes = require('./routes/bookings');
app.use('/api/v2/bookings', bookingRoutes);

const plannerRoutes = require('./routes/planner');
app.use('/api/v2/planner', plannerRoutes);

const dialogflow = require('./routes/dialogflow');
app.use('/dialogflow', dialogflow);

//IMAGE UPLOAD ROUTE
const upload = require('./routes/file-upload');
app.use('/api/add-image', upload);


module.exports = app;
