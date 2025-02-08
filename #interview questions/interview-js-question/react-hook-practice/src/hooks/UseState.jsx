import React, { useState } from "react";

const UseState = () => {
  const [changeTextState, setChangeTextState] = useState("Initial");

  function handleTextChange() {
    setChangeTextState("Changes");
  }

  return (
    <div>
      <p>{changeTextState}</p>
      <button onClick={handleTextChange}>Change state</button>
    </div>
  );
};

export default UseState;
