import React from "react";
import Name from "./Name";
import Ternary from "./Ternary";

//how to use if else in reactjs
let name = "juhi";
const Fav = () => {
  // return
  if (name === "anupam") {
    return <Name name="anupam" />;
  } else {
    return <Name name="juhi" />;
  }
};

export default function App() {
  return (
    <div>
      <h1>running</h1>
      <Fav />
      <Ternary />
    </div>
  );
}
