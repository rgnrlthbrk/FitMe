let Food = require('../models/food.model');

module.exports = {
  addFood:      (req, res) => {
    Food.findOne({
      name: req.body.name
    }, (err, food) => {
      if (err) {
        console.log(err);
        res.json({success: false, message: 'Error!'});
        throw err;
      }

      if (food) {
        res.json({success: false, message: 'This product already exists!'});
      } else {
        let entry = new Food({
          name:      req.body.name,
          value:     req.body.value,
          quantity:  req.body.quantity,
          calories:  parseInt(req.body.calories),
          protein:   parseFloat(req.body.protein),
          fat:       parseFloat(req.body.fat),
          carbs:     parseFloat(req.body.carbs),
          meal:      req.body.meal,
          allergens: req.body.allergens
        });

        entry.save((err) => {
          if (err) {
            throw err;
          }
          res.json({
            success: true,
            message: 'The product has been added.'
          });

        });
      }
    });
  },
  getBreakfast: (req, res) => {
    Food.find(
      {
        'value':
          {$in: [/^m_/i, /^v_/i, /^rb_/i]},
        'meal.breakfast' : true
      },
      {
        '_id':       0,
      },
      (err, foodArr) => {
        if (err) {
          console.log(err);
          res.json({success: false, message: 'Error!'});
          throw err;
        }


        foodArr.forEach((food, index) => {
          console.log(food);
        });

        if (!foodArr) {
          res.json({
            success: false,
            message: 'No results!',
            results: null});
        } else {
          res.json({
            success: true,
            message: 'Your results are ready.',
            results: foodArr
          });
        }
      });

  }
};