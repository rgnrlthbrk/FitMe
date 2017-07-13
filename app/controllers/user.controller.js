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
    console.log('Today: ' + thisDate);
    let entry = new User({
      name           : req.body.name,
      password       : req.body.password,
      admin          : req.body.admin,
      authorisations : req.body.authorisations,
      creationDate   : thisDate
    });

    // save the sample user
    entry.save((err) => {
      if (err)
        throw err;

      console.log('User saved successfully');
      res.json({message : entry.name + ' created!'});
    });
  }
};