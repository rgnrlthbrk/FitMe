let User     = require('./../models/user.model'),
    UserData = require('./../models/userdata.model'),
    Q        = require('q');

module.exports = {
  getUser:             () => {
    let deferred = Q.defer();
    User.find(
      {},
      {'_id': 0, 'username': 1},
      (err, users) => {
        if (err) {
          console.log('User not found!');
          console.log(err);
          throw err;
        }
        if (!users) {
          console.log('No user found found!');
          console.log(err);
          throw err;
        } else {
          let userArr = [];
          users.forEach((user) => {
            userArr.push(user.username);
          });
          deferred.resolve(userArr);
        }
      });
    return deferred.promise;
  },
  getUserData:         (userArr) => {
    let deferred = Q.defer();

    UserData.find(
      {username: {'$in': userArr}},
      {'_id': 0, '__v': 0},
      (err, userDataArr) => {
        if (err) {
          console.log('UserData not found!');
          console.log(err);
          throw err;
        }
        if (!userDataArr) {
          console.log('No user data found found!');
          console.log(err);
          throw err;
        } else {
          deferred.resolve(userDataArr);
        }
      });
    return deferred.promise;
  },
  setUserDataCalories: (userCalories) => {
    UserData.update(
      {username: userCalories.username},
      {$set: {userCalories: userCalories.calories}},
      (err, status) => {
        if (err){
          console.log('Error: ' + err);
          throw err;
        }
        if (!status) {
          console.log('No update!')
        }
      }
    );
  }
};