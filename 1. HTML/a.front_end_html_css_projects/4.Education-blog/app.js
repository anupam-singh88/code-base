let burger = document.querySelector(".burger");
let navbar = document.querySelector(".nav");
let resp = document.querySelector(".resp");


console.log(resp);
burger.addEventListener('click', () => {

	navbar.classList.toggle('h-nav');
	resp.classList.toggle('v-class');
})
