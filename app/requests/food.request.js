let FoodData    = require('./../models/fooddata.model'),
    Food        = require('../models/food.model'),
    userRequest = require('../requests/user.request'),
    dailymenu   = require('../utils/dailymenu.util'),
    Q           = require('q');

module.exports = {
  addFood:                addFood,
  addUserMenu:            addUserMenu,
  getUserMealTomorrow:    getUserMealTomorrow,
  getUserMenuToday:       getUserMealToday,
  addUnparsedUserMenuArr: addUnparsedUserMenuArr,
  getUnparsedUserMenuArr: getUnparsedUserMenuArr
};

function addFood(req, res) {
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
}

function getUnparsedUserMenuArr(id) {
  let deferred = Q.defer();
  FoodData.findOne(
    {
      _id: id
    },
    {
      '_id': 0,
      '__v': 0
    },
    (err, foodMenu) => {
      if (err) {
        console.log(err);
        throw err;
      }
      if (!foodMenu) {
        console.log('foodMenu is null');
        deferred.resolve(null);
      } else {
        deferred.resolve(foodMenu);
      }
    }
  );
  return deferred.promise;
}

function addUnparsedUserMenuArr(userMenu) {
  let deferred = Q.defer();
  FoodData
    .findOneAndUpdate(
      {
        _id: userMenu.food_data
      },
      {
        breakfast: userMenu.breakfast,
        brunch:    userMenu.brunch,
        lunch:     userMenu.lunch,
        snack:     userMenu.snack,
        dinner:    userMenu.dinner
      },
      (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        }
        if (!result) {
          let entry = new FoodData(userMenu);
          entry.save((err, foodData) => {
            if (err) {
              console.log(err);
              throw err;
            }

            deferred.resolve(foodData._id);
          });
        } else {
          deferred.resolve(result._id);
        }
      });
  return deferred.promise;
}

function addUserMenu(id) {
  let tmpUserData;
  userRequest
    .getSingleUserData(id)
    .then((userData) => {
      if (!userData) {
        console.log('No newUserData! Return null!');
        return null;
      } else {
        tmpUserData = userData;
        return getUnparsedUserMenuArr(tmpUserData.food_data);
      }
    })
    .then((result) => {
      if (!result || result.length <= 0) {
        console.log('No food menu array for user! Return null!');
        return null;
      } else {
        let deferred = Q.defer();
        deferred.resolve(dailymenu.parseResult(result));
        return deferred.promise;
      }
    })
    .then((parsedMenu) => {
      if (!parsedMenu) {
        console.log('No parsedMenu data! Return null!');
        return null;
      } else {
        console.log('parsedMenu: ');
        console.log(parsedMenu);
        if (tmpUserData.food_menu) {
          console.log('menu');
          userRequest.handleUserDataFoodMenu(tmpUserData, parsedMenu);
        } else {
          console.log('new');
          userRequest.handleUserDataFoodMenuNew(tmpUserData, parsedMenu);
        }
      }
    })
    .catch((error) => {
      console.log('Error: ' + error);
    });
}

function getUserMealTomorrow(username) {
  let deferred = Q.defer();
  userRequest
    .getSingleUserByName(username)
    .then((user) => {
      if (!user) {
        console.log('null user!');
      } else {
        return userRequest.getSingleUserData(user.user_data);
      }
    })
    .then((userData) => {
      if (!userData) {
        console.log('null user data!');
        deferred.resolve(null);
      } else {
        console.log('userData11: ' + userData);
        deferred.resolve(userData.food_menu);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return deferred.promise;
}

function getUserMealToday(username) {
  let deferred = Q.defer();
  userRequest
    .getSingleUserByName(username)
    .then((user) => {
      if (!user) {
        console.log('null user!');
      } else {
        return userRequest.getSingleUserData(user.user_data);
      }
    })
    .then((userData) => {
      if (!userData) {
        console.log('null user data!');
        deferred.resolve(null);
      } else {
        console.log('userData11: ' + userData);
        deferred.resolve(userData.food_menu_past[userData.food_menu_past.length - 1]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return deferred.promise;
}