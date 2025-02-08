import React, { useEffect, useState } from "react";

//to get data from localstorage

const getLocalItem = () => {
  let arr = localStorage.getItem("notes");
  if (arr) {
    return JSON.parse(localStorage.getItem("notes"));
  } else {
    return [];
  }
};
export default function Todo() {
  //   const [item, setItem] = useState([]);
  const [text, setText] = useState("");
  const [item, setItem] = useState(getLocalItem());
  const [editedItem, setEditedItem] = useState(null);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const saveData = (e) => {
    e.preventDefault();

    if (text === "") {
      alert("kindly enter the note");
    } else if (text && !toggleSubmit) {
      setItem(
        item.map((elm) => {
          if (elm.id === editedItem) {
            return { ...elm, name: text };
          }
          return elm;
        })
      );
      setText("");
      setEditedItem(null);
      setToggleSubmit(true);
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: text };
      setItem([...item, allInputData]);
      setText("");
      //   saveToLocal();
    }
    // console.log(item);
  };
  const deletItem = (id) => {
    const newList = item.filter((elm) => {
      return id !== elm.id;
    });
    // const newList = item.filter((elm, index) => {
    //   return index !== id;
    // });
    setItem(newList);
    // console.log(item);
    // setItem((oldItems) => {
    //     return oldItems.filter((arrElm, index) => {
    //       return index !== id;
    //     });
    //   });
  };

  //steps when user click on edit button
  //   1: get the id and name of the data which user clicked to edit
  // 2: set the toggle mode to change the submit button into edit button
  //3 : now update the value of the setinput with the new updated value to exit
  //4 : to pass the current elemetn id to new state variable

  const editItem = (id) => {
    let newEditItem = item.find((elm, ind, arr) => {
      return elm.id === id;
    });
    setText(newEditItem.name);
    setToggleSubmit(false);
    setEditedItem(id);
  };

  const saveToLocal = () => {
    localStorage.setItem("notes", JSON.stringify(item));
  };
  useEffect(() => {
    saveToLocal();
  }, [item]);
  return (
    <div>
      <h1>todo component</h1>
      <form action="">
        <input
          type="text"
          name="inp"
          id=""
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {toggleSubmit ? (
          <button type="submit" onClick={saveData}>
            Add Note
          </button>
        ) : (
          <button type="submit" onClick={saveData}>
            Update Note
          </button>
        )}
      </form>
      {item.map((item, id) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <button
              onClick={() => {
                editItem(item.id);
              }}
            >
              edit me
            </button>
            <button
              onClick={() => {
                deletItem(item.id);
              }}
            >
              delete me
            </button>
          </div>
        );
      })}
    </div>
  );
}
