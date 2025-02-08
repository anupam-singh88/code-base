let searchBox = document.getElementById('searchBox');
let form = document.getElementById('form');
let container = document.getElementById('container');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    container.style.backgroundColor = searchBox.value;
    searchBox.value = ''
})

function generateColor() {
    let str = '#' + Math.floor(Math.random() * 16777215).toString(16);  //hexadecimal
    container.style.backgroundColor = str;
}
