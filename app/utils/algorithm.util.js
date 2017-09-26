module.exports = {
  compare: compare,
  sort:    mergeSort
};

function compare(first, second, drink, calories) {
  let arr = [];
  while (first) {
    if (!first) break;
    if (!first.length) break;
    let left = first.pop();
    let objArr = checkMealArr(left, second, drink, calories);
    if (objArr) {
      if (objArr.length) {
        objArr.forEach((element) => {
          arr.push(element);
        });
      }
    }
  }
  return arr;
}

function checkMealArr(left, second, drink, calories) {
  let tmpSecond = second.slice(),
      arr       = [];

  while (tmpSecond) {
    if (!tmpSecond) break;
    if (!tmpSecond.length) break;

    let leftCopy = left,
        rightPop = tmpSecond.pop();

    if (!leftCopy || !rightPop) break;

    leftCopy.count = 3;
    rightPop.count = 3;

    let obj = checkMeal(leftCopy, rightPop, drink, calories);
    if (obj) {
      arr.push(obj);
    }
  }
  return arr;
}

function checkMeal(left, right, drink, calories) {
  if (left.calories * left.count + right.calories * right.count <= calories) {
    if (calories - calories * 0.1 <= left.calories * left.count + right.calories * right.count) {
      return toMeal(left, right, drink);
    } else {
      return null;
    }
  } else {
    if (left.count === right.count === 0.5
      && left.calories * left.count + right.calories * right.count <= calories
      && calories - calories * 0.1 <= left.calories * left.count + right.calories * right.count) {
      return toMeal(left, right, drink);
    }

    if (left.count < right.count && 0.5 < right.count) {
      right.count -= 0.25;
      return checkMeal(left, right, drink, calories);
    } else {
      if (left.count === right.count && 0.5 < right.count) {
        right.count -= 0.25;
        return checkMeal(left, right, drink, calories);
      } else if (right.count < left.count && 0.5 < left.count) {
        left.count -= 0.25;
        return checkMeal(left, right, drink, calories);
      } else {
        return null;
      }
    }
  }
}

function toMeal(left, right, drink) {
  let mealObj = {first: {}, second: {}, drink: {}};
  mealObj.first = {subMeal: left, count: left.count, calories: left.count * left.calories};
  mealObj.second = {subMeal: right, count: right.count, calories: right.count * right.calories};
  mealObj.drink = {subMeal: drink, count: 0, calories: 0};
    if (drink) {
    mealObj.drink.subMeal = drink[Math.floor((Math.random() * 5) + 1)];
    mealObj.drink.count = 1;
  }
  return mealObj;
}

function mergeSort(arr) {
  let len = arr.length;
  if (len < 2)
    return arr;
  let mid   = Math.floor(len / 2),
      left  = arr.slice(0, mid),
      right = arr.slice(mid);
  //send left and right to the mergeSort to broke it down into pieces
  //then merge those
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [],
      lLen   = left.length,
      rLen   = right.length,
      l      = 0,
      r      = 0;
  while (l < lLen && r < rLen) {
    if (left[l].calories < right[r].calories) {
      result.push(left[l++]);
    }
    else {
      result.push(right[r++]);
    }
  }
  //remaining part needs to be addred to the result
  return result.concat(left.slice(l)).concat(right.slice(r));
}