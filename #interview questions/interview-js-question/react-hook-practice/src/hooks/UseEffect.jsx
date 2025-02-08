import React, { useEffect } from "react";

const UseEffect = () => {
  useEffect(() => {
    alert("My name is don");
    return () => {
      //   console.log("Demounting");
      alert("Demounting");
    };
  });
  return <div></div>;
};

export default UseEffect;
