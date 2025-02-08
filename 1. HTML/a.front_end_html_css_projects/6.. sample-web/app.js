let burger = document.querySelector(".burger");
let navbar = document.querySelector(".nav");
let resp = document.querySelector(".resp");


console.log(resp);
burger.addEventListener('click', () => {

	navbar.classList.toggle('h-nav');
	resp.classList.toggle('v-class');
})

const slides = document.querySelectorAll('.slide');
const auto = true; // Auto scroll
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
	// Get current class
	const current = document.querySelector('.current');
	// Remove current class
	current.classList.remove('current');
	// Check for next slide
	if (current.nextElementSibling) {
		// Add current to next sibling
		current.nextElementSibling.classList.add('current');
	} else {
		// Add current to start
		slides[0].classList.add('current');
	}
	setTimeout(() => current.classList.remove('current'));
};

// Auto slide
if (auto) {
	// Run next slide at interval time
	slideInterval = setInterval(nextSlide, intervalTime);
}
