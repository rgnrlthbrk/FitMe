let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let foodSchema = new Schema({
  name:      {
    type:     String,
    required: true,
    unique:   true
  },
  value:     {
    type:     String,
    required: true,
    unique:   true
  },
  quantity:  {
    type:     String,
    required: true,
    unique:   true
  },
  calories:  {
    type:     Number,
    required: true,
    unique:   true
  },
  protein:   {
    type:     Number,
    required: true,
    unique:   true
  },
  fat:       {
    type:     Number,
    required: true,
    unique:   true
  },
  carbs:     {
    type:     Number,
    required: true,
    unique:   true
  },
  meal:      {
    type:     Array,
    required: true
  },
  allergens: {
    type:     Array,
    required: false
  }
});

let Food = mongoose.model('fm_food', foodSchema, 'fm_food');

module.exports = Food;
