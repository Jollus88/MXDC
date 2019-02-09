// Activate/Deactivate the mobile nav menu
const mobileMenuBtn = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');

const toggleActiveClass = function(e){
	this.classList.toggle('active');
	mobileMenu.classList.toggle('active');
}

mobileMenuBtn.addEventListener('click', toggleActiveClass);