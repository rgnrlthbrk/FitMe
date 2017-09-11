let UserRequest = require('../requests/user.request'),
    FoodRequest = require('../requests/food.request');

module.exports = {
  addFoodAdmin:          (req, res) => {
    return FoodRequest.addFood(req, res);
  },
  getUserDailyMenu: (req, res) => {
    let username = req.header('username');
    UserRequest
      .getSingleUser(username)
      .then((username) => {
        return UserRequest.getSingleUserData(username);
      })
      .then((userData) => {
        return FoodRequest.getUserMenu(userData.username);
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
          content: 'Error fetching user data!'
        });
      });
  }
};