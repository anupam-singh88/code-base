import React, { useState, useMemo } from "react";

const UseMemo = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  // Expensive calculation function
  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {} // Simulate heavy computation
    return num * 2;
  };

  // Memoized value for the expensive calculation
  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div>
      <h1>useMemo Example</h1>
      <div>
        <p>Count: {count}</p>
        <p>Memoized Value (Count * 2): {memoizedValue}</p>
        <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
        />
        <p>Input: {input}</p>
      </div>
    </div>
  );
};

export default UseMemo;
