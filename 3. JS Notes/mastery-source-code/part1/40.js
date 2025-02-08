// spread operator
// const array1 = [1, 2, 3];
// const array2 = [5, 6, 7];

// // const newArray = [...array1, ...array2, 89, 69];
// const newArray = [..."123456789"];// separate object in an array
// console.log(newArray);

// spread operator in objects
const obj1 = {
  key1: "value1",
  key2: "value2",
  //key1: "value3", //value of key1 will be overlaped
};
// console.log(obj1);
const obj2 = {
  key1: "valueUnique",
  key3: "value3",
  key4: "value4",
};

// const newObject = { ...obj2, ...obj1, key69: "value69" }; // key1 of obj2 will be added
// const newObject = { ...["item1", "item2"] };
const newObject = { ..."abcdefghijklmnopqrstuvwxyz" };
console.log(newObject);
// {
//   '0': 'a',
//   '1': 'b',
//   '2': 'c',
//   '3': 'd',
//   '4': 'e',
//   '5': 'f',
//   '6': 'g',
//   '7': 'h',
//   '8': 'i',
//   '9': 'j',
//   '10': 'k',
//   '11': 'l',
//   '12': 'm',
//   '13': 'n',
//   '14': 'o',
//   '15': 'p',
//   '16': 'q',
//   '17': 'r',
//   '18': 's',
//   '19': 't',
//   '20': 'u',
//   '21': 'v',
//   '22': 'w',
//   '23': 'x',
//   '24': 'y',
//   '25': 'z'
// }
