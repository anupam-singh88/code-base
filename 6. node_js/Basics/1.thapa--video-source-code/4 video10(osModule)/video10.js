const os = require("os");
let data = os.arch(); //64bit
const freeMemory = os.freemem();
const totalMemory = os.totalmem();
// console.log(`${freeMemory / 1024 / 1024 / 1024}`);
// console.log(`${totalMemory / 1024 / 1024 / 1024}`);
// console.log(os.hostname()); system name
// console.log(os.platform()); win32
// console.log(os.tmpdir());
console.log(os.type());
