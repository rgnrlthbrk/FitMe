require('dotenv').config();

// connect to our mongoDB database
let mongoose = require('mongoose');
mongoose.set('debug', false);
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URI, {config: {autoIndex: false}});

let express = require('express'),
    app     = express(),
    morgan  = require('morgan');
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
const schedule      = require('node-schedule'),
      usersCalories = require('./app/utils/usercalories.util'),
      menu          = require('./app/controllers/menu.controller');

// config files
let port = process.env.PORT || 8181;
app.listen(port, () => {
  schedule.scheduleJob('0 0 5 * *', function () {
    usersCalories
      .generateUserDailyCalories()
      .then(() => {
        console.log('menu.generateMenu');
        return menu.generateMenu();
      })
      .catch((err) => {
        console.log(err);
      });

  });
  console.log('--- Port ' + port + ' ---');
});

exports = module.exports = app;