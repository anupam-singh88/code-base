import React from 'react'

export default function NoteItem(props) {

    // console.log(props.note)
    return (
        <div>
            <p>{props.note.note} <button onClick={() => {
                props.updateNote(props.note.id)
            }}>Edit</button> <button onClick={() => {
                props.deleteNote(props.note.id)
            }}>Delete</button></p>
        </div>
    )
}
