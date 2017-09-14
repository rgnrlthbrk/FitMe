let userRequest = require('../requests/user.request'),
    ccal        = require('./caloriescounter.util');

module.exports = {
  generateUserDailyCalories:       () => {
    return userRequest
      .getUsers()
      .then((idArr) => {
        return userRequest.getUsersData(idArr);
      })
      .then((userDataArr) => {
        let userCaloriesArr = [];
        userDataArr.forEach((userData) => {
          if (!userData) {
            console.log('missing user data!');
          } else {
            let calories = ccal.getCallories(userData);
            userCaloriesArr.push({
              _id:      userData._id,
              calories: calories
            });
          }
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
  },
  generateSingleUserDailyCalories: (username) => {
    return userRequest
      .getSingleUserByName(username)
      .then((user) => {
        if (!user) {
          console.log('missing user');
        }
        return userRequest.getSingleUserData(user.user_data);
      })
      .then((userData) => {
        if (!userData) {
          console.log('missing userData');
        }
        let calories = ccal.getCallories(userData);
        return {
          _id:      userData._id,
          calories: calories
        };
      })
      .then((userCalories) => {
        userRequest.setUserDataCalories(userCalories);
        return userCalories;
      })
      .then((userCalories) => {
        return userCalories;
      })
      .catch((err) => {
        console.log(err);
      });

  }
};
