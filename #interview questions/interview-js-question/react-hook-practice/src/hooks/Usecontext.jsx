import { createContext, useContext, useReducer } from "react";

const myContext = createContext();

const myReducer = (state, action) => {
  switch (action.type) {
    case "hi":
      console.log("reducer running", state, action);
      break;
    default:
      console.log("no case matched");
  }
};

function MyContextPrvider({ children }) {
  const [myREd, dispatch] = useReducer(myReducer, {
    name: "anupm",
  });

  const handleReducer = () => {
    dispatch({
      type: "hi",
      id: "123",
    });
  };

  return (
    <myContext.Provider value={{ handleReducer }}>
      {children}
    </myContext.Provider>
  );
}

function useMyContext() {
  return useContext(myContext);
}

export { MyContextPrvider };

export default useMyContext;
