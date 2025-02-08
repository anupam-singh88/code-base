// typeof operator

// data types (primitive data types)
// string "harhit"
// number 2, 4, 5.6
// booleans
// undefined
// null
// BigInt
// Symbol

// let age = 22;
// let firstName = "harshit";

// console.log(typeof age); output : number

// 22 -> "22"
// convert number to string.
// age = age + "";             ----------add "" to the number
// console.log(typeof(age)); "22" string

// convert string to number.

// let myStr = +"34"; ---------add + to the string
// console.log(typeof myStr); number

// let age = "18";
// age = Number(age);
// console.log(typeof age);

// let age = 1;
// let string = String(age);
// console.log(typeof string);
// console.log(typeof age);
// Creating a symbol
const mySymbol = Symbol('my unique symbol');

// Using the symbol as an object property key
const myObject = {
    [mySymbol]: 'This is a value associated with the symbol',
};

// Accessing the value using the symbol
console.log(myObject[mySymbol]); // Output: "This is a value associated with the symbol"
