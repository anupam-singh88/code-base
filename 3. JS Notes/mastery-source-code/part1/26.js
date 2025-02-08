// intro to arrays
// reference type
// how to create arrays

// ordered collection of items

// let fruits = ["apple", "mango", "grapes"];

// let numbers = [1,2,3,4];

// let mixed = [1,2,2.3, "string", null, undefined];

// console.log(mixed);
// console.log(numbers);
// console.log(fruits[2]);

let fruits = ["apple", "mango", "grapes"]; //data type : object
let obj = {}; //data type : object literal
// console.log(fruits);
// fruits[1] = "banana"; value of mango changed to banana
// console.log(fruits);
console.log(typeof fruits); //object
console.log(typeof obj); //object
console.log(Array.isArray(fruits)); // to check whether an array or not return true or false result : true
console.log(Array.isArray(obj)); //result :false

// array indexing

//array are mutable

console.log(Object.is(
    fruits,
    ["apple", "banana", "grapes"]
)); //false