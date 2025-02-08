console.log('console added');

let note = document.getElementById('note');
let noteUl = document.getElementById('noteUl')
let updateBtn = document.getElementById('updateBtn');
let addBtn = document.getElementById('addBtn');

let itemArr = [];

const getLocalItem = () => {
    let arr = localStorage.getItem("notes");
    if (arr) {
        return JSON.parse(localStorage.getItem("notes"));
    } else {
        return [];
    }
};

function addNote() {
    if (note.value === '') {
        alert('Kindly enter data')
        return false;
    }
    const allInputData = {
        id: new Date().getTime(),
        note: note.value
    };
    let item = getLocalItem();
    const newList = [...item, allInputData]
    // localStorage.setItem('notes', JSON.stringify(newList));
    saveToLocal(newList)
    populateData();
    note.value = '';
}

function populateData() {
    noteUl.innerHTML = '';
    let item = getLocalItem();
    if (item.length === 0) {
        noteUl.innerHTML = 'Add Some Notes'
    }
    item.map((elm) => {
        let li = document.createElement('li')
        li.innerHTML = `${elm.note} <button onclick='setUpdateNote(${elm.id})' class='btns'>Edit</button> <button onclick='deleteNote(${elm.id})' class='btns'>Delete</button>`
        // return html
        noteUl.appendChild(li)
    })
    // noteUl.insertAdjacentHTML('afterbegin', save);
    // noteUl.innerHTML = save;
}

function saveToLocal(list) {
    localStorage.setItem('notes', JSON.stringify(list));
}

function deleteNote(id) {
    let item = getLocalItem();
    const newList = item.filter((elm) => {
        // let elmId = +elm.id;
        return elm.id !== id
    })
    // localStorage.setItem('notes', JSON.stringify(newList));
    console.log(newList)
    saveToLocal(newList)
    populateData()

}

function setUpdateNote(id) {
    addBtn.style.display = 'none'
    updateBtn.style.display = 'inline';
    let item = getLocalItem();

    let newEditItem = item.find((elm) => {
        return elm.id === id;
    })

    note.value = newEditItem.note;
    updateBtn.setAttribute('onclick', `updateFn(${newEditItem.id})`);
}
function updateFn(id) {
    console.log('update fns')
    let item = getLocalItem();
    let updatedNote = item.map((elm) => {
        if (elm.id === id) {
            return { ...elm, note: note.value }
        }
        return elm;
    })
    saveToLocal(updatedNote);
    populateData();
    note.value = '';
    addBtn.style.display = 'inline'
    updateBtn.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', populateData());