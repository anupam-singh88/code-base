// synchronous programming vs asynchronous programming
// synchronous programming
// *************************************************
// synchronous programming single threaded
//******************************************* */
// console.log("script start");

// for (let i = 1; i < 10000; i++) {
//   console.log("inside for loop");
// }

// console.log("script end");

// setTimeout return an id 

console.log("script start");

//this function call after 1sec=1000
const id = setTimeout(() => {
  console.log("inside setTimeout");
}, 1000);
for (let i = 1; i < 100; i++) {
  console.log("....");
}
console.log("settimeout id is ", id);
console.log("clearing time out");
clearTimeout(id);// to delete an id of setTimeout
console.log("Script end");
