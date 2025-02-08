import React from "react";
import Name from "./Name";
let name = "anupam";

export default function Ternary() {
  return (
    <div>
      <h1>learning ternary</h1>
      {name === "anupam" ? <Name name="anupam 😄" /> : <Name name="juhi" />}
    </div>
  );
}
