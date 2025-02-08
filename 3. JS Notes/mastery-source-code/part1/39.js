// computed properties

const key1 = "objkey1";
const key2 = "objkey2";

const value1 = "myvalue1";
const value2 = "myvalue2";

// const obj = {
//     objkey1 : "myvalue1",
//     objkey2 : "myvalue2",
// }

//one method
const obj = {
  [key1]: value1,
  [key2]: value2,
};
console.log(obj);

//second method
const obj2 = {};

obj2[key1] = value1;
obj2[key2] = value2;
console.log(obj2);

//third method
const obj3 = {};
obj3.key1 = value1;
obj3.key2 = value2;


//fourth method
const obj4 = Object.assign({}, { [key1]: value1, [key2]: value2 });

//fifth method 
const obj5 = Object.create(null); // this will create an empty object
obj5[key1] = value1;
obj5[key2] = value2;