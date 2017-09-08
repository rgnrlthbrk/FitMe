let UserQuerie = require('./../queries/user.querie'),
    FoodQuerie = require('./../queries/food.querie');

module.exports = {
  addFood:          (req, res) => {
    return FoodQuerie.addFood(req, res);
  },
  getUserDailyMenu: (req, res) => {
    let username = req.header('username');
    UserQuerie
      .getSingleUser(username)
      .then((username) => {
        return UserQuerie.getSingleUserData(username);
      })
      .then((userData) => {
        return FoodQuerie.getUserMenu(userData.username);
      })
      .then((userMenu) => {
        return res.json({
          success: true,
          content: userMenu
        });
      });

  }
};