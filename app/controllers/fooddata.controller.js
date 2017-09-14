let UserRequest = require('../requests/user.request'),
    FoodRequest = require('../requests/food.request');

module.exports = {
  addFoodAdmin:          (req, res) => {
    return FoodRequest.addFood(req, res);
  },
  getUserDailyMenu: (req, res) => {
    let username = req.header('username');
    UserRequest
      .getSingleUserByName(username)
      .then((id) => {
        return UserRequest.getSingleUserData(id);
      })
      .then((userData) => {
        return FoodRequest.getUnparsedUserMenuArr(userData.food_data);
      })
      .then((userMenu) => {
        return res.json({
          success: true,
          content: userMenu
        });
      })
      .catch((err) => {
        return res.status(403).send({
          success: true,
          content: 'Error fetchin'
        });
      });
  },
  getUserMenuToday: (req, res) => {
    FoodRequest
      .getUserMealToday(req.header('username'))
      .then((userMenu) => {
        return res.json({
          success: true,
          content: userMenu
        });
      })
      .catch((err) => {
        return res.status(403).send({
          success: true,
          content: 'Error fetchin'
        });
      });
  }
};