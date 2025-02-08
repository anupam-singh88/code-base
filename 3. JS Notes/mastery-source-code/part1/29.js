// how to clone array

// how to concatenate two arrays

let array1 = ["item1", "item2", { name: "harshit", last: { name: "singh" } }];
// let array2 = ["item1", "item2"];

// array1.slice(0) from index 0 a new array with all the element of array 1 after index 0 will be created

// let array2 = array1.slice(0).concat(["item3", "item4"]);

//new array2 with empty array concatenated with items of array1 and some new elements
// let array2 = [].concat(array1,["item3", "item4"]); fastest way for cloning

// new way
// **********spread operator *************
let oneMoreArray = ["item3", "item4"];
let array2 = [...array1, ...oneMoreArray]; // fastest way for cloning do shallow cloning

array1.push("item3");
// array1.push("item4");

array1[2].name = "harsh";

// console.log(array1 === array2);
// console.log(array1);
// console.log(array2);

let array3 = JSON.parse(JSON.stringify(array1)); // deep cloning
// let array3 = [].concat(array1);  // shallow cloning
// let array3 = Object.assign([], array1); // shallow cloning
array1[2].name = "harshit";

console.log("🚀 ~ array3:", array3)
