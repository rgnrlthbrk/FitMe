module.exports = {
  sort:    mergeSort,
  compare: compare
};

function compare(first, second, drink, calories) {
  let mealArr = [];

  let i = 0,
      j = 0;
  for (i; i < first.length; i++) {
    for (j = 0; j < second.length; j++) {
      if (first[i].calories + second[j].calories < calories) {
        if (calories - calories * 0.1 < first[i].calories + second[j].calories) {
          let mealObj = {first: {}, second: {}, drink: {}};
          mealObj.first = first[i];
          mealObj.second = second[j];
          mealObj.drink = { subMeal: {}, count: 0, calories: 0};
          if (drink) {
            mealObj.drink.subMeal = drink[Math.floor((Math.random() * 5) + 1)];
            mealObj.drink.count = 1;
          }
          mealArr.push(mealObj);
        }
      }
    }
  }
  return mealArr;
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