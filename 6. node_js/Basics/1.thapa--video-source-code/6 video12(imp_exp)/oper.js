const add = (a, b) => {
  return a + b;
};
const sub = (a, b) => {
  return a - b;
};
//use only when have a single export in a file
// module.exports = add;

module.exports.add1 = add;
module.exports.sub = sub;
// module.exports = { add, sub };
