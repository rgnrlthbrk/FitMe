let UserRequest = require('../requests/user.request'),
    FoodRequest = require('../requests/food.request');

module.exports = {
  addFoodAdmin:          (req, res) => {
    return FoodRequest.addFood(req, res);
  },
  getUserDailyMenu:    (req, res) => {
    let username = req.header('username'),
        message  = '';

    UserRequest
      .getSingleUserByName(username)
      .then((user) => {
        if(!user) {
          message = 'Missing user!';
        }
        return UserRequest.getSingleUserData(user.user_data);
      })
      .then((userData) => {
        if(!userData) {
          message = 'Missing userData!';
        }
        return FoodRequest.getUnparsedUserMenuArr(userData.food_data);
      })
      .then((userMenu) => {
        if(!userMenu) {
          message = 'Missing userMenu!';
        }
        return res.json({
          success: true,
          content: userMenu
        });
      })
      .catch((err) => {
        return res.status(403).send({
          success: true,
          content: message
        });
      });
  },
  getUserMenuTomorrow: (req, res) => {
    FoodRequest
      .getUserMealTomorrow(req.header('username'))
      .then((userMenu) => {
        return res.json({
          success: true,
          content: userMenu
        });
      })
      .catch((err) => {
        return res.status(403).send({
          success: true,
          content: 'Error fetching user data'
        });
      });
  },
  getUserMenuToday:    (req, res) => {
    FoodRequest
      .getUserMenuToday(req.header('username'))
      .then((userMenu) => {
        return res.json({
          success: true,
          content: userMenu
        });
      })
      .catch((err) => {
        return res.status(403).send({
          success: true,
          content: 'Error fetching user data'
        });
      });
  }
};