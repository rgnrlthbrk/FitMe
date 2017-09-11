let userRequest = require('../requests/user.request'),
    ccal = require('./calories.util');

module.exports = {
  generateUserDailyCalories: () => {
    return userRequest
      .getUsers()
      .then((userArr) => {
        return userRequest.getUsersData(userArr);
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
          userRequest.setUserDataCalories(userCalories);
        });
        return userCaloriesArr;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
