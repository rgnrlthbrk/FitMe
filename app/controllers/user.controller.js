let User = require('../models/user.model'),
    Date = require('../utils/date.util');

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
    let thisDate = Date.getCurrentDate();
    let entry = new User({
      username       : req.body.username,
      password       : req.body.password,
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
};