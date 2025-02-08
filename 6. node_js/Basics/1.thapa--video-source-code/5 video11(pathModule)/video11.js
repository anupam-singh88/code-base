const path = require("path");
// console.log(path.dirname("C:code/node/thapa/video11.js"));
// console.log(path.extname("C:code/node/thapa/video11.js"));
// console.log(path.basename("C:code/node/thapa/video11.js"));
console.log(path.parse("C:code/node/thapa/video11.js"));

//* {
//*     root: 'C:',
//*     dir: 'C:code/node/thapa',
//*     base: 'video11.js',
//*     ext: '.js',
//*     name: 'video11'
//*   }


// path.resolve() or path.join() works the same