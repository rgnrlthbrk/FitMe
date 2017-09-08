let user = require('../requests/user.request'),
    ccal = require('./calories.util');

module.exports = {
  generateUserDailyCalories: () => {
    return user
      .getUsers()
      .then((userArr) => {
        return user.getUsersData(userArr);
      })
      .then((userDataArr) => {
        let userCaloriesArr = [];
        userDataArr.forEach((userData) => {
          let calories = ccal.getCallories(userData);
          userCaloriesArr.push({
            username: userData.username,
            calories: calories
          });
        });
        return userCaloriesArr;
      })
      .then((userCaloriesArr) => {
        userCaloriesArr.forEach((userCalories) => {
          user.setUserDataCalories(userCalories);
        });
        return userCaloriesArr;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
