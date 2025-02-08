//? fs is a core module offered by nodejs for file system
//? type of using built-in modules in js there are two ways one is require and another is import(to use import make change in package.json file change type:'module')
const fs = require("fs");

//todo fs.writefilesync is a synchronous way of create a new file or rewrite the data into a file //blocking nature

//* const file = fs.writeFileSync('message.txt', 'dummyData')

//fs.appendFileSync used to append the data into the file without overwriting the existing file
//* fs.appendFileSync('message.txt', '   appending data in dummyData')

//?nodejs includes an additional data types called buffer(not available in browser's javascript)
//buffer is mainly used to  store binary data
//while reading from a file or receiving packets over the network
//* const buf_data = fs.readFileSync('message.txt');
// *org_data = buf_data.toString();
// console.log(org_data);

//to rename a file
fs.renameSync("message.txt", "data.txt");
