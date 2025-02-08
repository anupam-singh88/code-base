import React, { useRef } from "react";

const UseRef = () => {
  const textRef = useRef(null);

  function handleRefChange() {
    textRef.current.textContent = "2"; // Use textContent to update the text
    textRef.current.style.color = "red";
  }

  return (
    <div>
      <p ref={textRef}>1</p>
      <button onClick={handleRefChange}>Change text</button>
    </div>
  );
};

export default UseRef;
