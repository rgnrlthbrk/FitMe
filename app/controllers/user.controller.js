let User = require('../models/user.model'),
    Date = require('../utils/date.util'),
    passwordHash = require('password-hash');

module.exports = {
  showUser : (req, res) => {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  },
  addUser  : (req, res) => {
    User.findOne({
      'username' : req.body.username,
    }, (err, user) => {
      if (err) {
        console.log('Error: ' + err);
        throw err;
      }
      if (user) {
        return res.status(403).send({
          success : false,
          message : 'User with this name already exists.'
        });
      } else {
        User.findOne({
          'email' : req.body.email,
        }, (err, email) => {
          if (err) {
            console.log('Error: ' + err);
            throw err;
          }
          if (email) {
            return res.status(403).send({
              success : false,
              message : 'User with this e-mail already exists.'
            });
          } else {
            let hashedPassword = passwordHash.generate(req.body.password, { algorithm: process.env.ALGORITHM, iterations: process.env.ITERATIONS });

            let thisDate = Date.getCurrentDate();
            let entry = new User({
              username       : req.body.username,
              password       : hashedPassword,
              email          : req.body.email,
              authorisations : req.body.authorisations,
              creationDate   : thisDate
            });

            entry.save((err) => {
              if (err) {
                throw err;
              }
              console.log('User saved successfully');
              res.json({message : entry.username + ' created!'});
            });
          }
        });
      }
    });
  }
};