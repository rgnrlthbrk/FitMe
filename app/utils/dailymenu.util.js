module.exports = {
  parseResult: parseResult
};

function parseResult(result) {
  let objArr = [];
  if (!result) {
    console.log('empty result');
    return null;
  }
  objArr.push(parseMenu(result.breakfast, 'breakfast'));
  objArr.push(parseMenu(result.brunch, 'brunch'));
  objArr.push(parseMenu(result.lunch, 'lunch'));
  objArr.push(parseMenu(result.snack, 'snack'));
  objArr.push(parseMenu(result.dinner, 'dinner'));

  return objArr;
}

function parseMenu(menu, name) {
  let obj = {};

  if (menu) {
    let arr = menu;
    let randomIndex = Math.floor(Math.random() * arr.length);
    obj['name'] = name;
    obj['first'] = convertReadableMeal(arr[randomIndex].first);
    obj['second'] = convertReadableMeal(arr[randomIndex].second);
    obj['drink'] = convertReadableMeal(arr[randomIndex].drink);
  }
  return obj;
}

function convertReadableMeal(obj) {
  // 3 types of quantity: ml, g and 1
  if (!obj.subMeal) return null;
  let typeOfQuantity = obj.subMeal.quantity;
  let mealStr = '';
  let a = {'0.25': 'quarter', '0.5': 'half', '0.75': '3/4'};
  if (typeOfQuantity.indexOf('ml') !== -1) {
    mealStr = obj.count * 100 + 'ml' + ' of fresh ' + obj.subMeal.name + '; calories: ' + obj.calories;
  } else if (typeOfQuantity.indexOf('g') !== -1) {
    mealStr = obj.count * 100 + 'g' + ' of ' + obj.subMeal.name + '; calories: ' + obj.calories;
  } else {
    let fraction = obj.count % 1;
    let number = '';
    if (a['' + fraction]) {
      if (Math.floor(obj.count)) {
        number = Math.floor(obj.count) + ' and a ' + a['' + fraction];
      }
      number = a['' + fraction];
    }
    mealStr = number + ' ' + obj.subMeal.name + '; calories: ' + obj.calories;
  }
  return mealStr;
}