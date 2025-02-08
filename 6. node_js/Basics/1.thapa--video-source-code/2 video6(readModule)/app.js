const fs = require("fs");

//to make a folder using fs
//* fs.mkdirSync('anupam');

//* fs.writeFileSync('bio2.txt', 'my nam e is anupam')
//fs.appendFileSync(path,text)

//? we can read data directly if we use encoding
//* const data = fs.readFile
const data = fs.readFileSync("bio.txt", "utf-8");
console.log("🚀 ~ data ~ data:", data);

//* fs.renameSync(oldPath,newPath)

//to delete a file in fs
//* fs.unlinkSync('bio2.txt');

//to delete a folder
// fs.rmdirSync("anupam");
