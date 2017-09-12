let FoodData = require('./../models/fooddata.model'),
    Food     = require('../models/food.model'),
    Q        = require('q');

module.exports = {
  addFood:     (req, res) => {
    Food.findOne({
      name: req.body.name
    }, (err, food) => {
      if (err) {
        console.log(err);
        throw err;
      }

      if (food) {
        return res.json({success: false, message: 'This product already exists!'});
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
          return res.json({
            success: true,
            message: 'The product has been added.'
          });
        });
      }
    });
  },
  getUserMenu: (username) => {
    let deferred = Q.defer();
    FoodData.find(
      {
        username: username
      },
      {
        '_id': 0,
        '__v': 0
      },
      (err, foodData) => {
        if (err){
          console.log(err);
          throw err;
        }
        deferred.resolve(foodData);
      }
    );
    return deferred.promise;
  },
  addUserMenu: (userMenu) => {
    FoodData
      .findOneAndUpdate(
        {
          username: userMenu.username
        },
        {
          username: userMenu.username,
          breakfast: userMenu.breakfast,
          brunch: userMenu.brunch,
          lunch: userMenu.lunch,
          snack: userMenu.snack,
          dinner: userMenu.dinner

        },
        (err, result) => {
          if (err) {
            console.log(err);
            throw err;
          }
          if (!result) {
            console.log('Adding data for user ' + userMenu.username);
            let entry = new FoodData(userMenu);
            entry.save((err) => {
              if (err) {
                console.log(err);
                throw err;
              }
            });
          }
        });

  }
};