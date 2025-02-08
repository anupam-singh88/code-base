import React from "react";
import ReactDOM from "react-dom";
import name, { add, sub, mul, div } from "./App";
// import App, { myname, standard } from "./App";
import "./index.css";

ReactDOM.render(
  <>
    {/* <h1>
      React App - {myname} {standard}
    </h1> */}
    {/* <App /> */}
    <h2>{name}</h2>
    <h2>{add(2, 3)}</h2>
    <h2>{sub(3, 3)}</h2>
    <h2>{mul(2, 3)}</h2>
    <h2>{div(6, 3)}</h2>
  </>,
  document.getElementById("root")
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
