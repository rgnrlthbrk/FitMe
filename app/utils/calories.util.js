module.exports = {
  getCallories: (userData) => {
    if (userData.sex === 'male') {
      return getCaloriesMen(userData);
    } else if (userData.sex === 'female') {
      return getCaloriesWomen(userData);
    }
  }
};

function getCaloriesMen(userData) {
  let RMR = 66 + (13.7 * parseInt(userData.kilos))
               + (5 * parseInt(userData.height))
               - (6.8 * parseInt(userData.age)); // RMR in kcal
  let AC = RMR * activityPeriod[userData.activityPeriod];
  return getTypeOfDiet(userData.goals, AC);
}

function getCaloriesWomen(userData) {
  let RMR = 655 + (9.6 * parseInt(userData.kilos))
                + (1.8 * parseInt(userData.height))
                - (4.7 * parseInt(userData.age));  // RMR in kcal
  let AC = RMR * activityPeriod[userData.activityPeriod];
  return getTypeOfDiet(userData.goals, AC);
}

let activityPeriod = {
  none:      1.2,
  onethree:  1.375,
  threefive: 1.55,
  sixseven:  1.725,
  extreme:   1.9,
};

// 12% cut or gain of the daily meal
function getTypeOfDiet(diet, AC) {
  if (diet === 'loose') {
    return AC - AC * 0.13;
  }
  if (diet === 'keep') {
    return AC;
  }
  if (diet === 'gain') {
    return AC + AC * 0.13;
  }
  console.log('Error fetching data');
  return null;
}

