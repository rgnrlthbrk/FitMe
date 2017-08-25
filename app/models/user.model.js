let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  authorisations: {},
  creationDate: String
});

let User = mongoose.model('fm_users', userSchema, 'fm_users');

module.exports = User;
