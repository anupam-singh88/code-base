import React from "react";

// let class = 15;
let myname = "anupam singh";
let standard = 12;

const App = () => {
  return (
    <div>
      <h1> from react app</h1>
    </div>
  );
};

function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}

export { add, sub, mul, div };
export default myname;
// export default App;

// export { myname, standard };
