let container = document.getElementById('container');
let page = 1;
let API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
let form = document.getElementById('form');
const searchBox = document.getElementById('searchBox');

// getMovies(API)
async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.results)
    console.log(data)
    showMovie(data);


}
window.addEventListener('DOMContentLoaded', getMovies(API))

function showMovie(data) {
    container.innerHTML = ''
    data.results.map((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("card");
        let imgPath = IMGPATH + poster_path;
        movieEl.innerHTML = `
        <img src="${imgPath.includes(null) ? 'movie1.png' : imgPath}"
   
        alt="${title}">
        <h3>${title}</h3>
        <p> ${overview.slice(0, 50)}</p>
    `;
        container.appendChild(movieEl)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const serachItem = searchBox.value;

    if (serachItem) {
        getMovies(SEARCHAPI + serachItem);

        searchBox.value = '';
    }
    console.log('searching')


})

function nextFn() {
    // console.log('next btn clicked');
    page++;
    console.log(page);
    let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
    getMovies(url);

}
function prevFn() {
    page--
    console.log(page);
    let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;
    getMovies(url);
}

let nav = document.getElementById('nav');
let burger = document.getElementById('burger');
let navUl = document.getElementById('navUl');
let search = document.getElementById('form');

burger.addEventListener("click", () => {
    console.log('clicked');
    nav.classList.toggle('h-nav')
    if (nav.classList.contains('h-nav')) {
        // navUl.style.display = 'flex'
        search.style.display = 'block'
    } else {
        navUl.style.display = 'none'
        search.style.display = 'none'
    }
    // navUl.classList.toggle('v-class')

})