// var React = require("react");  common js module
import React from "react";
// var ReactDom = require("react-dom");
import ReactDom from "react-dom";
import "./index.css";

// *ReactDom.render('what to show','where to show',"callback func")
// ReactDom.render(<h1>hello world</h1>, document.getElementById(" root"));

//? another way
// ReactDom.render(
//   React.createElement("h1", null, "THAPA TECHNICAL LITE"),
//   document.getElementById("root")
//   );

// another way
// var h1 = document.createElement("h1");
// h1.innerHTML = "THAPA TECHNINCAL";
// document.getElementById("root").appendChild(h1);

// const name = "Anupam Singh";
const currDate = new Date().toLocaleDateString();
// console.log(currDate);

const myStyle = {
  color: "red",
  backgroundColor: "yellow",
};
ReactDom.render(
  <>
    <p contentEditable="true">hello world </p>
    <p style={myStyle}>multiple lines</p>
    <p>Today date : {currDate}</p>
    <img src="https://picsum.photos/250/300" alt="dummy" />
  </>,
  document.getElementById("root")
);

// ReactDom.render(
//   <div>
//     <p>hello world</p>
//     <p>multiple lines</p>
//   </div>,
//   document.getElementById("root")
// );

//jsx fragment
// ReactDom.render(
//   <React.Fragment>
//     <p>hello {name}</p>
//     <p>multiple lines</p>
//
//   </React.Fragment>,
//   document.getElementById("root")
// );

// ReactDom.render(
//   [
//     <p>hello world</p>,
//     <p>multiple lines</p>
//     ],
//   document.getElementById("root")
// );
