let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let userDataSchema = new Schema({
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
  userCalories:   {
    type:     Number,
    required: false
  },
  food_data:      {
    type: Schema.Types.ObjectId,
    ref:  'FoodData'
  },
  food_menu:      {
    type:     Object,
    required: false
  },
  food_menu_past: {
    type:     Array,
    required: false
  }
});

let UserData = mongoose.model('fm_user_data', userDataSchema, 'fm_user_data');

module.exports = UserData;
