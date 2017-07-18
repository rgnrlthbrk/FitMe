let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  password: String,
  authorisations: {},
  creationDate: String
});

let User = mongoose.model('a_user', userSchema, 'a_user');

module.exports = User;
