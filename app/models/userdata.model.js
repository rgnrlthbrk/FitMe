let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let userDataSchema = new Schema({
  username:       {
    type:     String,
    required: true,
    unique:   true
  },
  age:            {
    type:     Number,
    required: true
  },
  height:         {
    type:     Number,
    required: true
  },
  kilos:          {
    type:     Number,
    required: true
  },
  sex:            {
    type:     String,
    required: true
  },
  allergic:       {
    type:     Array,
    required: false
  },
  goals:          {
    type:     String,
    required: true
  },
  activityPeriod: {
    type:     String,
    required: true
  },
  userCalories:  {
    type:     Number,
    required: false
  }
});

let UserData = mongoose.model('fm_user_data', userDataSchema, 'fm_user_data');

module.exports = UserData;
