/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll('section');
const mainContainer = document.querySelector('main');
const navBarMenu = document.querySelector('.navbar__menu');
const navList = navBarMenu.querySelector('#navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function handleNavItemClick(event) {
	event.preventDefault();
}

function findActiveNavLink(section) {
	return navList.querySelector(`.${section.id}`);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
// use a loop to create a navigation list item from each of the section data attributes
sections.forEach((section) => {
	const navItem = document.createElement('li');
	navItemLink = document.createElement('a');
	navItemLink.innerText = section.dataset.nav;
	navItemLink.classList.add('menu__link');
	navItemLink.classList.add(section.id);
	navItemLink.href = '#' + section.id;
	navItem.appendChild(navItemLink);
	navList.appendChild(navItem);
});

// Add class 'active' to section when near top of viewport

function addActiveClass(entries) {
	entries.forEach((entry) => {
		entry.target.classList.add('active-section');
		navLink = findActiveNavLink(entry.target);
		navLink.classList.add('active');
		if (entry.intersectionRatio < 0.5) {
			entry.target.classList.remove('active-section');
			navLink.classList.remove('active');
		}
	});
}

const options = {
	threshold: 0.5,
	rootMargin: '-6%',
};

const activeSectionObserver = new IntersectionObserver(addActiveClass, options);

sections.forEach((section) => {
	activeSectionObserver.observe(section);
});

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

// Scroll back to top when reaches the footer 

const footer = document.querySelector('.page__footer');
const scrollUpButton = document.querySelector('.btn--scroll-up');
const scrollUpButtonWrapper = document.querySelector('.scroll-up-btn-wrapper');

function reachedBotttom(entry) {
    if(entry[0].isIntersecting){
        scrollUpButtonWrapper.classList.add('inView');
    }	
    else {
        scrollUpButtonWrapper.classList.remove('inView');
    }
}

const reachedBottomObserver = new IntersectionObserver(reachedBotttom, {
	threshold: 0.1,
});

reachedBottomObserver.observe(footer);

// Add event and return to the top when the button is clicked 
function scrollToTop(){
    window.scrollTo({
        top: 0,  
        left: 0,
        behavior: "smooth"
    });
}

scrollUpButton.addEventListener('click', scrollToTop); 
