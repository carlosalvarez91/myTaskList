const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', ()=> {
    console.log('connected to database'+config.database);
});
// On error
mongoose.connection.on('error', (err)=> {
    console.log('Database error'+err);
});

const index = require('./routes/index');
const tasks = require('./routes/tasks');
const users = require('./routes/users');

//port number
const port = 3000;

const app = express();

// cors Middleware
app.use(cors());

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

// body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//index
app.use('/', index);
app.use('/api', tasks);
app.use('/user', users);

app.get('/',(req, res)=>{
    res.send('Invaled Endpoint');
});

//start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});