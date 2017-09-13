let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let foodDataSchema = new Schema({
  breakfast: {
    type:     Array,
    required: true
  },
  brunch:    {
    type:     Array,
    required: false
  },
  lunch:     {
    type:     Array,
    required: true
  },
  snack:     {
    type:     Array,
    required: true
  },
  dinner:    {
    type:     Array,
    required: true
  }
});

let FoodData = mongoose.model('fm_food_data', foodDataSchema, 'fm_food_data');

module.exports = FoodData;
