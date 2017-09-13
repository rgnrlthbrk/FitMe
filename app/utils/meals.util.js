let Food      = require('../models/food.model'),
    algorithm = require('./../utils/algorithm.util'),
    Q         = require('q');

module.exports = {
  getBreakfast: (userData) => {
    let deferred = Q.defer();
    let allergensList = [];
    userData['allergic'].forEach((allergen) => {
      allergensList.push(allergen.value);
    });

    Food.find(
      {
        'meal.breakfast':  true,
        'allergens.value': {$nin: allergensList}
      },
      {'_id': 0, '__v': 0},
      (err, foods) => {
        if (err) {
          console.log('Error: ' + err);
          throw err;
        }
        let percent = 0.3; // keep
        if ('gain' === userData.goals) {
          percent = 0.25;
        }
        deferred.resolve(generateCustomMeal(['m_', 'rb_', 'ml_', 'v_'], ['f_'], ['d_'], userData.userCalories * percent, foods));
      }
    );
    return deferred.promise;
  },
  getBrunch:    (userData) => {
    let deferred = Q.defer();
    let allergensList = [];
    userData['allergic'].forEach((allergen) => {
      allergensList.push(allergen.value);
    });

    Food.find(
      {
        'meal.brunch':     true,
        'allergens.value': {$nin: allergensList}
      },
      {'_id': 0, '__v': 0},
      (err, foods) => {
        if (err) {
          console.log('Error: ' + err);
          throw err;
        }

        if (userData.goals === 'gain') {
          deferred.resolve(generateCustomMeal(['m_', 'rb_', 'v_'], ['f_'], null, userData.userCalories * 0.1, foods));
        } else {
          deferred.resolve(null);
        }
      }
    );
    return deferred.promise;
  },
  getLunch:     (userData) => {
    let deferred = Q.defer();
    let allergensList = [];
    userData['allergic'].forEach((allergen) => {
      allergensList.push(allergen.value);
    });

    Food.find(
      {
        'meal.lunch':      true,
        'allergens.value': {$nin: allergensList}
      },
      {'_id': 0, '__v': 0},
      (err, foods) => {
        if (err) {
          console.log('Error: ' + err);
          throw err;
        }
        deferred.resolve(generateCustomMeal(['m_'], ['v_'], ['d_'], userData.userCalories * 0.3, foods));
      }
    );
    return deferred.promise;
  },
  getSnack:     (userData) => {
    let deferred = Q.defer();
    let allergensList = [];
    userData['allergic'].forEach((allergen) => {
      allergensList.push(allergen.value);
    });

    Food.find(
      {
        'meal.snack':      true,
        'allergens.value': {$nin: allergensList}
      },
      {'_id': 0, '__v': 0},
      (err, foods) => {
        if (err) {
          console.log('Error: ' + err);
          throw err;
        }
        deferred.resolve(generateCustomMeal(['m_'], ['f_'], null, userData.userCalories * 0.15, foods));
      }
    );
    return deferred.promise;
  },
  getDinner:    (userData) => {
    let deferred = Q.defer();
    let allergensList = [];
    userData['allergic'].forEach((allergen) => {
      allergensList.push(allergen.value);
    });

    Food.find(
      {
        'meal.dinner':     true,
        'allergens.value': {$nin: allergensList}
      },
      {'_id': 0, '__v': 0},
      (err, foods) => {
        if (err) {
          console.log('Error: ' + err);
          throw err;
        }

        let percent = 0.25; // keep
        if ('gain' === userData.goals) {
          percent = 0.2;
        }
        deferred.resolve(generateCustomMeal(['m_', 'rb_'], ['v_', 'f_'], null, userData.userCalories * percent, foods));
      }
    );
    return deferred.promise;
  }
};

function generateCustomMeal(pattern1, pattern2, pattern3, calories, foods) {

  let first = generateSubMeal(foods, pattern1);
  let second = generateSubMeal(foods, pattern2);
  let drink = (pattern3) ? generateDrink(foods) : null;

  return algorithm.compare(first, second, drink, calories);
}

function generateSubMeal(foods, pattern) {
  let arr = foods.filter((food) => {
    let a = false;
    pattern.forEach((p) => {
      if (food.value.includes(p)) {
        a = true;
      }
    });
    return a;
  });

  return algorithm.sort(arr);
}

function generateDrink(foods) {
  return foods.filter((food) => {
    return food.value.includes('d_');
  });
}
