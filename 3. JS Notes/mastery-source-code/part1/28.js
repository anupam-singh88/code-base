// primitve vs reference data types
//primitve means only one vale (Stack)
//reference data types contain address of variable (Heap)
// let num1 = 6;
// let num2 = num1; here value of num1 saved at num2
// console.log("value is num1 is", num1);
// console.log("value is num2 is", num2);
// num1++;
// console.log("after incrementing num1")
// console.log("value is num1 is", num1);
// console.log("value is num2 is", num2);

// reference types
// array
let array1 = ["item1", "item2"];
let array2 = array1; //here array2 will get the address of array1
console.log("array1", array1);
console.log("array2", array2);
array1.push("item3");
console.log("after pushing element to array 1");
console.log("array1", array1);
console.log("array2", array2);
