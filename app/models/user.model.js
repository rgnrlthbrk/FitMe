let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let userSchema = new Schema({
  username       : {
    type     : String,
    required : true,
    unique   : true
  },
  password       : {
    type     : String,
    required : true,
    unique   : true
  },
  email          : {
    type     : String,
    required : true,
    unique   : true
  },
  authorisations : {
    type     : Array,
    required : false
  },
  creationDate   : {
    type     : Date,
    default  : Date.now,
    required : true
  },
  user_data:       {
    type: Schema.Types.ObjectId,
    ref: 'UserData'
  }
});

let User = mongoose.model('fm_user', userSchema, 'fm_user');

module.exports = User;
