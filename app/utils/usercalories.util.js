let user = require('./../queries/user.querie'),
    ccal = require('./calories.util');

module.exports = {
  generateUserDailyCalories: () => {
    console.log('generateUserDailyCalories');
    return user
      .getUser()
      .then((userArr) => {
        return user.getUserData(userArr);
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
