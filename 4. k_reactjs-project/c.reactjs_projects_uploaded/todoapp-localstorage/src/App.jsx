import React, { useEffect, useState } from 'react'
import NoteItem from './NoteItem';

//check for notes present in localstorage or note
const getLocal = () => {
  let arr = localStorage.getItem('notes');
  if (arr) {
    return JSON.parse(arr)
  }
  else {
    return [];
  }
}

export default function App() {
  const [text, setText] = useState('')
  const [noteArr, setNoteArr] = useState(getLocal())
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editedItem, setEditedItem] = useState(null);

  // setting the value of the note input field
  const onchange = (e) => {
    setText(e.target.value)
  }

  //updating the note on the basis of id
  const updateNote = (id) => {
    let updateArr = noteArr.find((elm) => {
      return elm.id === id
    })
    setText(updateArr.note)
    setEditedItem(id);
    setToggleSubmit(false);
  }
  const deleteNote = (id) => {
    let afterDeleteArr = noteArr.filter((elm) => {
      console.log(elm)
      return elm.id !== id
    })
    setNoteArr(afterDeleteArr)
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (text === '') {
      alert('Kindly Add Note')
      return false
    } else if (text && !toggleSubmit) {
      setNoteArr(noteArr.map((elm) => {
        if (elm.id === editedItem) {
          return { ...elm, note: text }
        }
        return elm;
      }))
      setText('');
    } else {
      const allInputData = { id: new Date().getTime().toString(), note: text };

      setNoteArr([...noteArr, allInputData])
      setText('')
    }
  }
  const saveToLocal = () => {
    localStorage.setItem('notes', JSON.stringify(noteArr))
  }
  useEffect(() => {
    saveToLocal();
  }, [noteArr])
  return (
    <div>
      <h1>Note App</h1>
      <form onSubmit={submitHandler}>
        <input type="text" name="note" id="" value={text} onChange={onchange} />
        {toggleSubmit ? (
          <button type="submit">
            Add Note
          </button>
        ) : (
          <button type="submit">
            Update Note
          </button>
        )}
      </form>
      {
        noteArr.map((elm) => {
          return <NoteItem note={elm} key={elm.id} updateNote={updateNote} deleteNote={deleteNote} />
        })
      }
    </div>
  )
}
