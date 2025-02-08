// for in loop in array gives the index 
const fruits = ["apple", "mango", "grapes", "fruit4", "fruit5"];
const fruits2 = [];

for (let index in fruits) {
    fruits2.push(fruits[index].toUpperCase());
}
console.log(fruits2);