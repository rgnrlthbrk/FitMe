let Food      = require('./../models/food.model'),
    algorithm = require('./../utils/algorithm.util'),
    Q         = require('q');
;

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
        let percent = 0.35; // keep
        if ('loose' === userData.goals) {
          percent = 0.35;
        } else if ('gain' === userData.goals) {
          percent = 0.3;
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
        console.log(userData.userCalories * 0.1);
        deferred.resolve(generateCustomMeal(['m_'], ['f_'], null, userData.userCalories * 0.1, foods));
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
        console.log(userData.userCalories * percent);
        deferred.resolve(generateCustomMeal(['m_', 'rb_', 'v_'], ['f_'], null, userData.userCalories * percent, foods));
      }
    );
    return deferred.promise;
  }
};

function generateCustomMeal(pattern1, pattern2, pattern3, calories, foods) {
  // 1. get food quantity - if ml, g or 1
  // 2. (m_ || rb_ || ml_+ v_) + (f_ || f_rye_bread || (f_milk || f_yogurt)) + d_

  let first = generateSubMeal(calories, foods, pattern1);
  let second = generateSubMeal(calories, foods, pattern2);
  let drink = (pattern3) ? generateDrink(foods) : null;

  return algorithm.compare(first, second, drink, calories);
}

function generateSubMeal(calories, foods, pattern) {
  let first = foods.filter((food) => {
    let a = false;
    pattern.forEach((p) => {
      if (food.value.includes(p)) {
        a = true;
      }
    });
    return a;
  });

  let arrSubMeal = [];
  first.forEach((subMeal) => {
    if ((subMeal.calories * 2 ) <= calories) {
      arrSubMeal.push(maximizeSubMealCalories(subMeal, calories, 1));
    }
  });

  return algorithm.sort(arrSubMeal);
}

function generateDrink(foods) {
  let drink = foods.filter((food) => {
    return food.value.includes('d_');
  });

  return drink;
}

function maximizeSubMealCalories(subMeal, calories, count) {
  let obj = {};

  if (subMeal.calories * count <= calories / 2 && count <= 3) {
    return maximizeSubMealCalories(subMeal, calories, count + 0.25);
  } else {
    obj['subMeal'] = subMeal;
    obj['count'] = count - 0.25;
    obj['calories'] = (count - 0.25) * subMeal.calories;
  }
  return obj;
}

function shuffle(arr) {
  for (let i = arr.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
}