//1- Write a method that verifies an argument is a plain object, not an array or null
console.log("-----------------------------Nr.1---------------------------");
const data = { a: 1 };
//write your code here
function isPlainObject(dt) {
  return typeof dt === "object" && !Array.isArray(data) && typeof dt !== null;
}
console.log(isPlainObject(data)); // true

//2- Write a method that returns a deep array like [[key, value]]

console.log("-----------------------------Nr.2---------------------------");

const data2 = { a: 1, b: 2 };
//write your code here
function makePairs(dt) {
  let returnArr = [];
  for (let [key, val] of Object.entries(dt)) {
    returnArr.push([key, val]);
  }
  return returnArr;
}
console.log(makePairs(data2)); // [['a', 1], ['b', 2]]

//3- Write a method that returns a new object without provided properties

console.log("-----------------------------Nr.3---------------------------");

const data3 = { a: 1, b: 2 };
//write your code here
function without(dt, letter) {
  let returnObj = {};
  for (const [key, val] of Object.entries(dt)) {
    if (key !== letter) {
      returnObj[key] = val;
    }
  }
  return returnObj;
}
console.log(without(data3, "b")); // { a: 1 }

//4- Write a method that makes a shallow check is object empty

console.log("-----------------------------Nr.4---------------------------");

const data4 = { a: 1, b: undefined };
const data40 = { a: undefined };
//write your code here
function isEmpty(dt) {
  let getVal = Boolean;
  if (Object.keys(dt).length === 0) return true;
  else {
    for (let val of Object.values(dt)) {
      if (typeof val !== "undefined") return false;
      else continue;
    }
    return true;
  }
}
console.log(isEmpty({}));
console.log(isEmpty(data4)); // false
console.log(isEmpty(data40)); // true

//5- Write a method that makes a shallow compare of two objects

console.log("-----------------------------Nr.5---------------------------");

const data5 = { a: 1, b: 1 };
const data51 = { a: 1, b: 1 };
const data52 = { a: 1, b: 2 };
//write your code here
const isEqual = (obj1, obj2) => {
  return Object.entries(obj1).toString() === Object.entries(obj2).toString();
};
console.log(isEqual(data5, data51)); // true
console.log(isEqual(data5, data52)); // false

//6- Write a method that invokes an array method on a specific path

console.log("-----------------------------Nr.6---------------------------");

const data6 = { a: { b: [1, 2, 3] } };
//write your code here
function invoke(dt, str, cmd, arr) {
  //console.log(dt.a.b.splice(1, 2, 3));
  return str
    .split(".")
    .reduce((cac, cur) => cac?.[cur], dt)
    [cmd](...arr);
}
console.log(invoke(data6, "a.b", "splice", [1, 2])); // [2, 3]

//7- Write a method that makes a deep check is an object empty
console.log("-----------------------------Nr.7---------------------------");

const data7 = { a: { b: undefined } };
//write your code here
function isEmptyDeep(data) {
  if (Object.keys(data).length === 0) return true;
  for (let val of Object.values(data)) {
    for (let subVal of Object.values(val)) {
      if (subVal === undefined) continue;
      if (subVal === NaN) continue;
      if (subVal === null) continue;
      if (subVal.length === 0) continue;

      if (typeof subVal === "object" && Object.keys(subVal).length === 0)
        continue;

      return false;
    }
  }
  return true;
}
console.log(isEmptyDeep(data7)); //-->> true
console.log(isEmptyDeep({})); //-->>true
console.log(isEmptyDeep({ a: { b: [], c: {} } })); //-->> true
console.log(isEmptyDeep({ a: { b: 1 } })); //-->> false
console.log(isEmptyDeep({ a: { b: null } })); //-->> true

//8- Write a method that makes a deep compare of two objects

console.log("-----------------------------Nr.8---------------------------");

const data8 = { a: 1, b: { c: 1 } };
const data81 = { a: 1, b: { c: 1 } };
const data82 = { a: 1, b: { c: 2 } };
//write your code here

//create Flat Object function
const doFlatObj = obj => {
  const flatObj = {};
  const getFlatObj = (subObj, parentKey = "") => {
    if (parentKey !== "") parentKey += ".";
    Object.keys(subObj).forEach(key => {
      if (
        typeof subObj[key] === "object" &&
        subObj[key] !== null &&
        !Array.isArray(subObj)
      ) {
        Object.assign(flatObj, getFlatObj(subObj[key], parentKey + key));
        //getFlatObj(subObj[key]);
      } else {
        flatObj[parentKey + key] = subObj[key];
      }
    });
  };
  getFlatObj(obj);
  return flatObj;
};

// compare 2 objects after flat
const isEqualDeep = (obj1, obj2) => {
  console.log();
  if (Object.keys(obj1).toString() !== Object.keys(obj2).toString())
    return false;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  const flattenObj1 = doFlatObj(obj1);
  const flattenObj2 = doFlatObj(obj2);

  return (
    Object.entries(flattenObj1).toString() ===
    Object.entries(flattenObj2).toString()
  );
};
console.log(isEqualDeep(data8, data81)); // true
console.log(isEqualDeep(data8, data82)); // false

//9 - Write a method that finds shallow intersections of objects

console.log("-----------------------------Nr.9---------------------------");

const data9 = { a: 1, b: 2 };
const data91 = { c: 1, b: 2 };
//write your code here
function intersection(dt1, dt2) {
  let returnObj = {};
  let key1 = Object.keys(dt1);
  let key2 = Object.keys(dt2);
  const maxLength = Math.max(key1.length, key2.length);
  for (let i = 0; i < maxLength; i++) {
    if (key1[i] === key2[i]) returnObj[key1[i]] = Object.values(dt1)[i];
  }
  return returnObj;
}
console.log(intersection(data9, data91)); // { b: 2 }

//10- Write a method that finds all intersections of objects

console.log("-----------------------------Nr.10---------------------------");

const data10 = { a: 1, b: { c: 3, d: { e: 1 } } };
const data11 = { c: 1, b: { c: 3, d: { e: 1 } } };
//write your code here
function intersectionDeep(dt1, dt2) {
  let newObj = {};
  let data1 = Object.entries(dt1);
  let data2 = Object.entries(dt2);
  let maxLength = Math.max(data1.length, data2.length);
  for (let i = 0; i < maxLength; i++) {
    if (
      typeof data1[i][1] === "object" &&
      typeof data2[i][1] === "object" &&
      data1[i][1] !== null &&
      data2[i][1] !== null &&
      !Array.isArray(data1[i][1] && !Array.isArray(data2[i][1]))
    ) {
      if (
        Object.entries(data1[i][1]).toString() ===
        Object.entries(data2[i][1]).toString()
      ) {
        newObj[data1[i][0]] = data1[i][1];
      }
      continue;
    }
    if (data1[i][0] === data2[i][0] && data1[i][1] === data2[i][1]) {
      // Object.assign(newObj, { [data1[i][0]]: data1[i][1] });
      newObj[data1[i][0]] = data1[i][1];
      continue;
    }
  }
  return newObj;
}

console.log(intersectionDeep(data10, data11)); // { b: { c: 3 } }
