// how to iterate object
const person = {
  name: "harshit",
  age: 22,
  "person hobbies": ["guitar", "sleeping", "listening music"],
};

// for in loop
// Object.keys returns array

// for (let key in person) {
//     // console.log(`${key} : ${person[key]}`); //return a string
//     console.log(key, " : ", person[key]);
// }
// output:
// name: harshit
// age: 22
// person hobbies: ['guitar', 'sleeping', 'listening music']

// console.log(typeof Object.keys(person)); //return an array of object

const val = Array.isArray(Object.keys(person)); //array.isarray used to check weather or not
// console.log(val); //return true

// for (let key of Object.keys(person)) {
//     console.log(person[key]);
// }
// output:
// harshit
// 22
// ['guitar', 'sleeping', 'listening music']

// for (let key of Object.values(person)) {
//     console.log(key);
// }

// output:
// harshit
// 22
// ['guitar', 'sleeping', 'listening music']
for (let [key, value] of Object.entries(person)) {
  console.log("key: ", key, "+", "value: ", value);
}
