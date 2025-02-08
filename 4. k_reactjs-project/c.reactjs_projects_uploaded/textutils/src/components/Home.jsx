import React, { useState } from 'react'

export default function Home(props) {
    const [text, setText] = useState('');
    const onChangeHandler = (e) => {
        setText(e.target.value)
    }
    const upperCaseHandler = () => {
        setText(text.toUpperCase());
        props.showAlert('success', 'Converted to UpperCase!!!')
    }
    const lowerCaseHandler = () => {
        setText(text.toLowerCase());
        props.showAlert('success', 'Converted to LowerCase!!!')

    }
    const removeSpaceHandler = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert('success', 'Extra Space Removed!!!')

    }
    const copyHandler = () => {
        navigator.clipboard.writeText(text);
        props.showAlert('success', 'Text Copied!!!')

    }
    const clearHandler = () => {
        setText('');
        props.showAlert('warning', 'Text will be cleared!!!')

    }
    return (
        <>
            <div className="container" style={props.bodyStyle}>
                <div className="mb-3">
                    <h2 htmlFor="exampleFormControlTextarea1" className="form-label" style={props.bodyStyle}> TextUtils App</h2>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" value={text} onChange={onChangeHandler}></textarea>
                </div>
                <button type="button" className="btn btn-primary mx-2 my-2" onClick={upperCaseHandler} disabled={text.length == ''} >Convert To UpperCase</button>
                <button type="button" className="btn btn-primary mx-2 my-2" onClick={lowerCaseHandler} disabled={text.length == ''}>Convert To LowerCase</button>
                <button type="button" className="btn btn-primary mx-2 my-2" onClick={removeSpaceHandler} disabled={text.length == ''}>Remove extra spaces</button>
                <button type="button" className="btn btn-primary mx-2 my-2" disabled={text.length == ''} onClick={copyHandler}>Copy Text</button>
                <button type="button" disabled={text.length == ''} className="btn btn-primary mx-2 my-2" onClick={clearHandler}>Clear Text</button>

                <h1>Preview</h1>
                <p>{text}</p>
            </div>

        </>
    )
}
