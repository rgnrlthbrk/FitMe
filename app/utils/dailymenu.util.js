module.exports = {
  parseResult: parseResult
};

function parseResult(objResult) {
  let objArr = [],
      objMainArr = [];

  let result = {};
  if (!objResult) {
    console.log('empty result');
    if (!objResult[0]){
      console.log('empty result array');
      return null;
    }
    result = objResult[0];
  } else {
    result = objResult;
  }

  while (objMainArr.length < 2) {
    objArr.push(parseMenu(result.breakfast, 'breakfast'));
    objArr.push(parseMenu(result.brunch, 'brunch'));
    objArr.push(parseMenu(result.lunch, 'lunch'));
    objArr.push(parseMenu(result.snack, 'snack'));
    objArr.push(parseMenu(result.dinner, 'dinner'));
    objMainArr.push(objArr);
    objArr = [];
  }

  return objMainArr;
}

function parseMenu(menu, name) {
  let obj = {};

  if (menu) {
    let arr = menu;
    let randomIndex = Math.floor(Math.random() * arr.length);
    obj['name'] = name;
    let first = arr[randomIndex].first;
    obj['first'] = convertReadableMeal(first);
    let second = arr[randomIndex].second;
    obj['second'] = convertReadableMeal(second);
    let drink = arr[randomIndex].drink;
    obj['drink'] = convertReadableDrink(drink);

    obj['imgArr'] = [
      (first.subMeal)? first.subMeal.image : null,
      (second.subMeal)? second.subMeal.image : null,
      (drink.subMeal)? drink.subMeal.image : null,
    ]
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
    mealStr = obj.count * 100 + 'ml' + ' of fresh ' + obj.subMeal.name + ' containing ' + obj.calories+ ' calories';
  } else if (typeOfQuantity.indexOf('g') !== -1) {
    mealStr = obj.count * 100 + 'g' + ' of ' + obj.subMeal.name + ' containing ' + obj.calories+ ' calories';
  } else {
    let fraction = obj.count % 1;
    let number = '';
    if (a['' + fraction]) {
      if (Math.floor(obj.count)) {
        number = Math.floor(obj.count) + ' and a ' + a['' + fraction];
      } else {
        number = a['' + fraction];
      }
    }
    mealStr = number + ' ' + obj.subMeal.name + ' containing ' + obj.calories+ ' calories';
  }
  return mealStr;
}


function convertReadableDrink(obj) {
  // 3 types of quantity: ml, g and 1
  if (!obj.subMeal) return null;
  let typeOfQuantity = obj.subMeal.quantity;
  let mealStr = '';
  let a = {'0.25': 'quarter', '0.5': 'half', '0.75': '3/4'};
  if (typeOfQuantity.indexOf('ml') !== -1) {
    mealStr = obj.count * 100 + 'ml' + ' of fresh ' + obj.subMeal.name;
  } else if (typeOfQuantity.indexOf('g') !== -1) {
    mealStr = obj.count * 100 + 'g' + ' of ' + obj.subMeal.name;
  } else {
    let fraction = obj.count % 1;
    let number = '';
    if (a['' + fraction]) {
      if (Math.floor(obj.count)) {
        number = Math.floor(obj.count) + ' and a ' + a['' + fraction];
      }
      number = a['' + fraction];
    }
    mealStr = number + ' ' + obj.subMeal.name;
  }
  return mealStr;
}