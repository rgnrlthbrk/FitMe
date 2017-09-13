let userRequest = require('../requests/user.request'),
    ccal = require('./caloriescounter.util');

module.exports = {
  generateUserDailyCalories: () => {
    return userRequest
      .getUsers()
      .then((idArr) => {
        return userRequest.getUsersData(idArr);
      })
      .then((userDataArr) => {
        let userCaloriesArr = [];
        userDataArr.forEach((userData) => {
          let calories = ccal.getCallories(userData);
          userCaloriesArr.push({
            _id: userData._id,
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
