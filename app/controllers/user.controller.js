let User = require('../models/user.model'),
    Date = require('../utils/date.util');

module.exports = {

  showUser : (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  },
  addUser  : (req, res) => {
    let thisDate = Date.getCurrentDate();
    let entry = new User({
      name           : req.body.name,
      password       : req.body.password,
      authorisations : req.body.authorisations,
      creationDate   : thisDate
    });

    entry.save((err) => {
      if (err) {
        throw err;
      }
      console.log('User saved successfully');
      res.json({message : entry.name + ' created!'});
    });
  }
};