// for loop in array

let fruits = ["apple", "mango", "grapes", "banana"];

// for(let i=0; i<=9;i++){
//     console.log(i);
// }
// output : 123456789

// console.log(fruits.length); output : 4
// console.log(fruits[fruits.length-2]);
let fruits2 = [];
for (let i = 0; i < fruits.length; i++) {
  fruits2.push(fruits[i].toUpperCase());
}

console.log(fruits2);
