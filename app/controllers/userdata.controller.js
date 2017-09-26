let User         = require('../models/user.model'),
    UserData     = require('../models/userdata.model'),
    userRequest  = require('../requests/user.request'),
    userCalories = require('../utils/usercalories.util'),
    menuCtrl     = require('../controllers/menu.controller'),
    Q            = require('q'),
    passwordHash = require('password-hash');

module.exports = {
  addUser:        (req, res) => {
    let message = '';
    return userRequest
      .getSingleUserByName(req.body.username)
      .then((id) => {
        if (id) {
          message = 'User with this name already exists. Please select another username.';
          throw err;
        } else {
          return userRequest.getSingleUserByEmail(req.body.email);
        }
      })
      .then((id) => {
        if (id) {
          message = 'User with this e-mail already exists. Please enter another valid e-mail address.';
          throw err;
        } else {
          return checkPassword(req, res);
        }
      })
      .catch(() => {
        return res.status(403).send({
          success: false,
          message: message
        });
      });
  },
  showUserData:   (req, res) => {
    let message = '';
    return userRequest
      .getSingleUserByName(req.header('username'))
      .then((id) => {
        if (!id) {
          message = 'No user found!';
        } else {
          return userRequest.getSingleUserData(id.user_data);
        }
      })
      .then((result) => {
        if (!result) {
          message = 'No user data found!';
        } else {
          console.log(result);
          return res.json(result);
        }
      })
      .catch(() => {
        return res.status(403).send({
          success: false,
          message: message
        });
      });
  },
  editUserData:   (req, res) => {
    const username = req.body.username || req.header('username');
    userRequest
      .getSingleUserByName(username)
      .then((user) => {
        if (!user) {
          return null;
        } else {
          UserData.findOneAndUpdate({
              _id: user.user_data
            },
            {
              $set: request(req)
            },
            {upsert: true},
            (err) => {
              if (err) {
                res.status(403).send(err);
              } else {
                res.status(200).send({
                  success: true,
                  message: 'User data updated correctly!'
                });
              }
            });
        }
      })
      .then((user) => {
        userCalories.generateSingleUserDailyCalories(username)
          .then(() => {
            menuCtrl.generateMenuUser(username);
          });
      })
      .catch(() => {
        return res.status(403).send({
          success: false,
          message: 'Some error message.'
        });
      });

  },
  submitUserData: (req, res) => {
    const username = req.body.username || req.header('username');
    let tmpUser;
    let message = '';
    userRequest
      .getSingleUserByName(username)
      .then((user) => {
        if (!user) {
          message = 'User not found!';
          throw err;
        } else {
          tmpUser = user;
          return userRequest.getSingleUserData(user.user_data);
        }
      })
      .then((userData) => {
        if (userData) {
          message = 'Cannot set data to existing user!';
          throw err;
        } else {
          let deferred = Q.defer();
          let entry = new UserData({
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
            User.findOneAndUpdate({
                _id: tmpUser._id
              },
              {
                $set: {user_data: entry._id}
              },
              {upsert: true},
              (err) => {
                if (err) {
                  res.status(403).send(err);
                } else {
                  deferred.resolve(tmpUser);
                  res.json({message: 'User ' + tmpUser.username + ' has been populated with data!'});
                }
              });
          });
          return deferred.promise;
        }
      })
      .then((user) => {
        userCalories.generateSingleUserDailyCalories(tmpUser.username)
          .then(() => {
            menuCtrl.generateMenuUser(tmpUser.username);
          });
      })
      .catch(() => {
        return res.status(403).send({
          success: false,
          message: message
        });
      });
  }
};

function checkPassword(req, res) {
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
    return res.json({message: entry.username + ' has been created!'});
  });
}

function request(req) {
  let object = {};
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