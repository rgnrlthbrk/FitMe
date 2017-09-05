let User     = require('./../models/user.model'),
    Food     = require('./../models/food.model'),
    UserData = require('./../models/userdata.model'),
    calories = require('./../utils/calories.util'),
    userQ    = require('./../queries/user.querie');

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
          console.log(userData.username);
          getBreakfast(userData)
            .then((result) => {
              console.log('result');
              console.log(result);
            })
            .catch((err) => console.log(err));
          console.log('breakfast');
        })
          .catch((error) => {
            console.log('Error: ' + error);
            throw error;
          });

      });
  }
};

function getBreakfast(userData) {
  let allergensList = [];
  userData['allergic'].forEach((allergen) => {
    allergensList.push(allergen.value);
  });

  return Food.find(
    {
      'meal.breakfast':  true,
      'allergens.value': {$in: allergensList}
    },
    {'_id': 0, '__v': 0},
    (err, foods) => {
      return foods;
    }
  );
}

function getBrunch(userData) {
  let allergensList = [];
  userData['allergic'].forEach((allergen) => {
    allergensList.push(allergen.value);
  });

  Food.find(
    {
      'meal.brunch':     true,
      'allergens.value': {$in: allergensList}
    },
    {'_id': 0, '__v': 0},
    (err, foods) => {
    }
  );
}

function getLunch(userData) {
  let allergensList = [];
  userData['allergic'].forEach((allergen) => {
    allergensList.push(allergen.value);
  });

  Food.find(
    {
      'meal.lunch':      true,
      'allergens.value': {$in: allergensList}
    },
    {'_id': 0, '__v': 0},
    (err, foods) => {
    }
  );
}

function getSnack(userData) {
  let allergensList = [];
  userData['allergic'].forEach((allergen) => {
    allergensList.push(allergen.value);
  });

  Food.find(
    {
      'meal.snack':      true,
      'allergens.value': {$in: allergensList}
    },
    {'_id': 0, '__v': 0},
    (err, foods) => {
    }
  );
}

function getDinner(userData) {
  let allergensList = [];
  userData['allergic'].forEach((allergen) => {
    allergensList.push(allergen.value);
  });

  Food.find(
    {
      'meal.dinner':     true,
      'allergens.value': {$in: allergensList}
    },
    {'_id': 0, '__v': 0},
    (err, foods) => {
    }
  );
}
