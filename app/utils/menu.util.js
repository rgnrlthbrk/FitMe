let userQ = require('../requests/user.request'),
    foodQ = require('../requests/food.request'),
    meal  = require('./../utils/meal.util'),
    Q     = require('q');

module.exports = {
  generateMenu: () => {
    userQ
      .getUsers()
      .then((userArr) => {
        return userQ.getUsersData(userArr);
      })
      .then((userDataArr) => {
        userDataArr.forEach((userData) => {
          let userMenu = {};
          userMenu.username = userData.username;

          meal.getBreakfast(userData)
            .then((result) => {
              userMenu.breakfast = result;
              return meal.getBrunch(userData);
            })
            .then((result) => {
              userMenu.brunch = result;
              return meal.getLunch(userData);
            })
            .then((result) => {
              userMenu.lunch = result;
              return meal.getSnack(userData);
            })
            .then((result) => {
              userMenu.snack = result;
              return meal.getDinner(userData);
            })
            .then((result) => {
              userMenu.dinner = result;
              foodQ.addUserMenu(userMenu);
            });

        });
      });
  }
};
