let burger = document.querySelector('.burger');
let navbar = document.getElementById('nav')
let navSearch = document.getElementById('navSearch')


burger.addEventListener("click", () => {
    navbar.classList.toggle('h-nav')
    if (navbar.classList.contains('h-nav')) {

        navSearch.style.display = 'flex'
    } else {

        navSearch.style.display = 'none'
    }

})