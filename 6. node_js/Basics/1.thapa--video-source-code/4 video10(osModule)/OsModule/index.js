const os = require("os");

console.log(os.hostname()); //Anupam-PC
console.log(os.homedir()); //C:\Users\user
console.log(os.platform()); //win32
console.log(os.arch()); //x64
console.log(os.tmpdir()); //C:\Users\user\AppData\Local\Temp
console.log(os.type()); //Windows_NT

const freeMemory = os.freemem();
console.log(`${freeMemory / 1024 / 1024 / 1024}`); //0.4932670593261719

const totalMemory = os.totalmem();
console.log(`${totalMemory / 1024 / 1024 / 1024}`); //7.6790618896484375
