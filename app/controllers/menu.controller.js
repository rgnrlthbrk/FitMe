let userRequest = require('../requests/user.request'),
    foodRequest = require('../requests/food.request'),
    meal        = require('../utils/meals.util');

module.exports = {
  generateMenu:     () => {
    userRequest
      .getUsers()
      .then((idArr) => {
        return userRequest.getUsersData(idArr);
      })
      .then((userDataArr) => {
        userDataArr.forEach((userData) => {
          menuUser(userData);
        });
      });
  },
  generateMenuUser: (username) => {
    userRequest
      .getSingleUserByName(username)
      .then((user) => {
        if (user) {
          return userRequest.getSingleUserData(user.user_data);
        }
      })
      .then((userData) => {
        if (userData) {
          menuUser(userData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

function menuUser(userData) {
  let userMenu = {};
  userMenu.food_data = userData.food_data;

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
      return foodRequest.addUnparsedUserMenuArr(userMenu);
    })
    .then((id) => {
      return userRequest.updateUserDataFoodData(userData, id);
    })
    .then(() => {
      return foodRequest.addUserMenu(userData._id);
    })
    .catch((err) => {
      console.log(err);
    });
}