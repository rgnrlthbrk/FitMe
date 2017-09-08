let User         = require('../models/user.model'),
    UserData     = require('../models/userdata.model'),
    passwordHash = require('password-hash');

module.exports = {
  addUser:        (req, res) => {
    User.findOne({
      username: req.body.username,
    }, (err, user) => {
      if (err) {
        console.log('Error: ' + err);
        throw err;
      }
      if (user) {
        return res.status(403).send({
          success: false,
          message: 'User with this name already exists. Please select another username.'
        });
      } else {
        User.findOne({
          'email': req.body.email,
        }, (err, email) => {
          if (err) {
            console.log('Error: ' + err);
            throw err;
          }
          if (email) {
            return res.status(403).send({
              success: false,
              message: 'User with this e-mail already exists. Please enter another valid e-mail address.'
            });
          } else {
            let hashedPassword = passwordHash.generate(req.body.password, {
              algorithm:  process.env.ALGORITHM,
              iterations: process.env.ITERATIONS
            });

            let entry = new User({
              username:       req.body.username,
              password:       hashedPassword,
              email:          req.body.email,
              authorisations: req.body.authorisations
            });

            entry.save((err) => {
              if (err) {
                throw err;
              }
              res.json({message: entry.username + ' has been created!'});
            });
          }
        });
      }
    });
  },
  showUserData:   (req, res) => {
    UserData.findOne({
        username: req.header('username')
      },
      {
        '_id': 0,
        '__v': 0
      },
      (err, userData) => {
        if (err) {
          res.send(err);
        }
        console.log(userData);
        if (!userData) {
          return res.status(403).send({
            success: false,
            message: 'No user found.'
          });
        }
        res.json(userData);
      });
  },
  editUserData:   (req, res) => {
    const username = req.body.username || req.header('username');
    UserData.findOneAndUpdate({
        username: username
      },
      {
        $set: request(req, username)
      },
      {upsert: true},
      function (err) {
        if (err) {
          res.status(403).send(err);
        } else {
          res.status(200).send({
            success: true,
            message: 'User data updated correctly!'
          });
        }
      });
  },
  submitUserData: (req, res) => {
    User.findOne({
      username: req.body.username || req.header('username')
    }, (err, user) => {
      if (err) {
        console.log('Error: ' + err);
        return res.status(403).send(err);
      }

      if (!user) {
        return res.status(403).send({
          success: false,
          message: 'User with this name doesn\'t exist.'
        });
      } else {
        UserData.findOne({
          username: user.username,
        }, (err, user) => {
          if (err) {
            console.log('Error: ' + err);
            throw err;
          }
          if (user) {
            return res.status(403).send({
              success: false,
              message: 'Cannot set data to existing user.'
            });
          } else {

            let entry = new UserData({
              username:       req.body.username || req.header('username'),
              age:            req.body.age,
              height:         req.body.height,
              kilos:          req.body.kilos,
              sex:            req.body.sex,
              goals:          req.body.goals,
              activityPeriod: req.body.activityPeriod,
              allergic:       req.body.allergic
            });
            entry.save((err) => {
              if (err) {
                throw err;
              }
              res.json({message: 'User ' + entry.username + ' has been populated with data!'});
            });
          }
        });
      }
    });
  }
};

function request(req, username) {
  let object = {};
  object['username'] = username;
  for (let key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      if ('token' !== key || 'username' !== key) {
        if (req.body[key]) {
          object[key] = req.body[key];
        }
      }
    }
  }

  return object;
}