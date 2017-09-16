let User     = require('./../models/user.model'),
    UserData = require('./../models/userdata.model'),
    Q        = require('q');

module.exports = {
  getUsers:                  () => {
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
            if (user.user_data) {
              userDataIdArr.push(user.user_data);
            }
          });
          deferred.resolve(userDataIdArr);
        }
      });
    return deferred.promise;
  },
  getUsersData:              (idArr) => {
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
  getSingleUserByName:       (username) => {
    return User.findOne(
      {username: username},
      {
        '_v': 0
      },
      (err) => {
        if (err) {
          console.log('Error: ' + err);
        }
      });
  },
  getSingleUserByEmail:      (email) => {
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
  getSingleUserData:         (id) => {
    return UserData.findOne({
        _id: id
      },
      {
        '_v': 0
      },
      (err) => {
        if (err) {
          console.log('Error: ' + err);
        }
      });
  },
  setUserDataCalories:       (userCalories) => {
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
  updateUserDataFoodData:    (userData, food_data_id) => {
    if (!userData._id) {
      console.log('userdata null');
      return null;
    }
    let deferred = Q.defer();
    UserData.update(
      {_id: userData._id},
      {$set: {food_data: food_data_id}},
      (err, status) => {
        if (err) {
          console.log('Errorche: ' + err);
        }
        if (!status) {
          console.log('No update!');
          deferred.resolve(null);
        } else {
          deferred.resolve(status);
        }
      }
    );
    return deferred.promise;
  },
  handleUserDataFoodMenu:    (userData, food_menu) => {
    if (!userData._id) {
      console.log('userdata null');
      return null;
    }

    UserData.findOneAndUpdate(
      {_id: userData._id},
      {
        $set:  {food_menu: food_menu[0]},
        $push: {food_menu_past: userData.food_menu}
      },
      {upsert: true},
      (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
      });
  },
  handleUserDataFoodMenuNew: (userData, food_menu) => {
    if (!userData._id) {
      console.log('userdata null');
      return null;
    }

    console.log(userData._id + ' : ' + food_menu);
    UserData.findOneAndUpdate(
      {_id: userData._id},
      {
        $set:  {food_menu: food_menu[0]},
        $push: {food_menu_past: food_menu[1]}
      },
      {upsert: true},
      (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
      });
  },
  updateUserDataFoodMenu:    (userData, food_menu) => {
    if (!userData._id) {
      console.log('userdata null');
      return null;
    }
    console.log(userData._id + ' : ' + food_menu);

    UserData.findOneAndUpdate(
      {_id: userData._id},
      {
        $set: {food_menu: food_menu}
      },
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
};