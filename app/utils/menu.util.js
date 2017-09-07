let userQ = require('./../queries/user.querie'),
    meal  = require('./../utils/meal.util'),
    Q     = require('q');

module.exports = {
  generateMenu: () => {
    console.log('generateMenu');
    userQ
      .getUser()
      .then((userArr) => {
        return userQ.getUserData(userArr);
      })
      .then((userDataArr) => {
        userDataArr.forEach((userData) => {
          let obj = {
            username:  userData.username,
            breakfast: {},
            brunch:    {},
            lunch:     {},
            snack:     {},
            dinner:    {}
          };

          Q.all([
            meal.getBreakfast(userData),
            meal.getBrunch(userData),
            meal.getLunch(userData),
            meal.getSnack(userData),
            meal.getDinner(userData)
          ])
            .then((result) => {
              console.log('result:');
              console.log(result);
            });
        });
      });
  }
};
