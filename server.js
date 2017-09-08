require('dotenv').config();

// config files
let port = process.env.PORT || 8181;

// connect to our mongoDB database
let MongoClient = require('mongodb').MongoClient,
    mongoose    = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URI, {config: {autoIndex: false}});
//MongoClient.connect(process.env.DB_URI);

// get all data/stuff of the body (POST) parameters
// parse application/json
let express = require('express'),
    app     = express(),
    morgan  = require('morgan'),
    favicon = require('serve-favicon'),
    path    = require('path');
app.set('superSecret', process.env.SECRET);

app.use(morgan('dev'));

let bodyParser = require('body-parser');
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
let methodOverride = require('method-override');
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location
app.use(express.static(__dirname + '/dist'));

// routes
let router = require('./app/routes');
app.use('/', router);

// start app
const schedule = require('node-schedule');
app.listen(port, () => {
  // TODO: Have to think about an interval...
  schedule.scheduleJob('* * * * *', function () {
    let usersCalories = require('./app/utils/usercalories.util');
    usersCalories
      .generateUserDailyCalories()
      .then(() => {
        let menu = require('./app/utils/menu.util');
        menu.generateMenu();
      })
      .catch((err) => {
        console.log(err);
      });

  });
  console.log('--- Port ' + port + ' ---');
});

exports = module.exports = app;