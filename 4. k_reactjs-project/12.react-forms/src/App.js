import React, { useState } from "react";

export default function App() {
  let [fullName, setFullName] = useState({
    fName: "",
    lName: "",
  });
  const onChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.placeholder);
    // setText(e.target.value);
    // const value = e.target.value;
    // const name = e.target.name;

    //const { value, name } = event.target;

    setFullName({ ...fullName, [e.target.name]: e.target.value });
    // console.log(value);
    // setFullName((prevState) => {
    //   // console.log(prevState);
    //   // return { ...prevState, [name]: value };
    //   if (name === "fName") {
    //     return {
    //       fName: value,
    //       lName: prevState.lName,
    //     };
    //   } else {
    //     return {
    //       fName: prevState.fName,
    //       lName: value,
    //     };
    //   }
    // });
  };
  let onSubmit = (e) => {
    e.preventDefault();
    // let inpData = text;
    console.log(fullName.fName + " " + fullName.lName);
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <h1>{fullName.fName + " " + fullName.lName}</h1>
        <input
          type="text"
          name="fName"
          value={fullName.fName}
          // onChange={(e) => {
          //   setText(e.target.value);
          // }}
          onChange={onChange}
          id=" "
          placeholder="Enter your name"
        />{" "}
        <br />
        <input
          type="text"
          name="lName"
          value={fullName.lName}
          onChange={onChange}
          id=" "
          placeholder="Enter last name"
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
