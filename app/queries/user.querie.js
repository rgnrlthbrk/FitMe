let User     = require('./../models/user.model'),
    UserData = require('./../models/userdata.model'),
    Q        = require('q');

module.exports = {
  getUsers:     () => {
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
  getUsersData: (userArr) => {
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
  getSingleUser:     (username) => {
    let deferred = Q.defer();
    User.findOne(
      { username: username},
      {'_id': 0, 'username': 1},
      (err, result) => {
        if (err) {
          console.log('User not found!');
          console.log(err);
          throw err;
        }
        if (!result) {
          console.log('No user found found!');
          console.log(err);
          throw err;
        } else {
          deferred.resolve(result.username);
        }
      });
    return deferred.promise;
  },
  getSingleUserData: (username) => {
    let deferred = Q.defer();

    UserData.findOne(
      {username: username},
      {'_id': 0, '__v': 0},
      (err, userData) => {
        if (err) {
          console.log('UserData not found!');
          console.log(err);
          throw err;
        }
        if (!userData) {
          console.log('No user data found found!');
          console.log(err);
          throw err;
        } else {
          deferred.resolve(userData);
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