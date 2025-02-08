import React, { useState, useCallback, useEffect } from "react";
import useMyContext from "./Usecontext";

const Button = React.memo(({ handleClick, children }) => {
  //   console.log(`Rendering button - ${children}`);
  return <button onClick={handleClick}>{children}</button>;
});

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const { handleReducer } = useMyContext();
  //   console.log("🚀 ~ UseCallbackExample ~ handleReducer:", handleReducer);
  //   console.log("🚀 ~ UseCallbackExample ~ value:", value);

  useEffect(() => {
    handleReducer();
  }, []);

  // Memoized function for incrementing count
  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  // Memoized function for resetting count
  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <h1>useCallback Example</h1>
      <p>Count: {count}</p>
      <Button handleClick={increment}>Increment</Button>
      <Button handleClick={reset}>Reset</Button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>Text: {text}</p>
    </div>
  );
};

export default UseCallbackExample;
