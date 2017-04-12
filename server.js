const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      morgan = require('morgan'),
     // session = require('express-session'),
      passport = require('passport'),
      jwt = require('jsonwebtoken'),
      config = require('./config/database');



const index = require('./routes/index'),
      tasks = require('./routes/tasks'),
      users = require('./routes/users');

const  mongojs = require('mongojs');

const app = express();
const port = 3000;

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// Cors Middleware
app.use(cors());


// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

// Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Log requests to console
app.use(morgan('dev'));

//Passport Middleware
app.use(passport.initialize());

// Bring in passsport strategy
require('./config/passport')(passport);


//API routes
app.use('/', index);
app.use('/user', users);
app.use('/user/', tasks);

// Mongoose Connect to Database
mongoose.connect(config.database);
//On connection
mongoose.connection.on('connected', ()=> {
    console.log('connected to database'+config.database);
});
// On error
mongoose.connection.on('error', (err)=> {
    console.log('Database error'+err);
});


app.get('/',(req, res)=>{
    res.send('Invalid Endpoint');
});

//start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});