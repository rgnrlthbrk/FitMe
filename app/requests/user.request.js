let User     = require('./../models/user.model'),
    UserData = require('./../models/userdata.model'),
    Q        = require('q'),
    mongoose = require('mongoose');

module.exports = {
  getUsers:             () => {
    let deferred = Q.defer();
    User.find(
      {},
      {'_id': 0},
      (err, users) => {
        if (err) {
          console.log('User not found!');
          console.log(err);
          deferred.resolve(null);
        }
        if (!users) {
          console.log('No user found found!');
          console.log(err);
          deferred.resolve(null);
        } else {
          let userDataIdArr = [];
          users.forEach((user) => {
            if(user.user_data) {
              userDataIdArr.push(user.user_data);
            }
          });
          deferred.resolve(userDataIdArr);
        }
      });
    return deferred.promise;
  },
  getUsersData:         (idArr) => {
    let deferred = Q.defer();
    UserData.find(
      {_id: {'$in': idArr}},
      {'__v': 0},
      (err, userDataArr) => {
        if (err) {
          console.log(err);
          deferred.resolve(null);
        }
        if (!userDataArr) {
          console.log(err);
          deferred.resolve(null);
        } else {
          deferred.resolve(userDataArr);
        }
      });
    return deferred.promise;
  },
  getSingleUserByName:  (username) => {
    let deferred = Q.defer();
    User.findOne(
      {username: username},
      {
        '_id': 1,
        'user_data': 1,
        'food_data': 1
      },
      (err, result) => {
        if (err) {
          console.log(err);
          deferred.resolve(null);
        }
        if (!result) {
          console.log(err);
          deferred.resolve(null);
        } else {
          deferred.resolve(result);
        }
      });
    return deferred.promise;
  },
  getSingleUserByEmail: (email) => {
    let deferred = Q.defer();
    User.findOne(
      {email: email},
      {
        'user_data': 1,
        'food_data': 1
      },
      (err, result) => {
        if (err) {
          console.log('User not found!');
          console.log(err);
          deferred.resolve(null);
        }
        if (!result) {
          console.log('No user found found!');
          console.log(err);
          deferred.resolve(null);
        } else {
          deferred.resolve(result);
        }
      });
    return deferred.promise;
  },
  getSingleUserData:    (id) => {
    let deferred = Q.defer();
    console.log(mongoose.Types.ObjectId(id));
    UserData.findOne({
        _id: id
      },
      {
        '_id': 0
      },
      (err, userData) => {
        if (err) {
          console.log(err);
          deferred.resolve(null);
        }
        if (!userData) {
          console.log(err);
          deferred.resolve(null);
        } else {
          deferred.resolve(userData);
        }
      });
    return deferred.promise;
  },
  setUserDataCalories:  (userCalories) => {
    UserData.update(
      {_id: userCalories._id},
      {$set: {userCalories: userCalories.calories}},
      (err, status) => {
        if (err) {
          console.log('Error: ' + err);
        }
        if (!status) {
          console.log('No update!');
        }
      }
    );
  },
  updateUserDataFoodData: (userData, food_data_id)=> {
    UserData.update(
      {_id: userData._id},
      {$set: {food_data: food_data_id}},
      (err, status) => {
        if (err) {
          console.log('Error: ' + err);
        }
        if (!status) {
          console.log('No update!');
        }
      }
    );
  }
};