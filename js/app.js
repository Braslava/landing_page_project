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
const navList = document.querySelector('#navbar__list');
const footer = document.querySelector('.page__footer');
const scrollUpButton = document.querySelector('.btn--scroll-up');
const scrollUpButtonWrapper = document.querySelector('.scroll-up-btn-wrapper');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Finds navigation item that corresponds to a section
function findActiveNavLink(section) {
	return navList.querySelector(`.${section.id}`);
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth',
	});
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function builNavItem(section) {
	const navItem = document.createElement('li');
	const navItemLink = document.createElement('a');
	navItemLink.innerText = section.dataset.nav;
	navItemLink.classList.add('menu__link');
	navItemLink.classList.add(section.id);
	navItemLink.href = '#' + section.id;
	navItem.appendChild(navItemLink);
	navList.appendChild(navItem);
}

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

// Scroll to anchor ID using scrollTO event

function handleNavItemClick(event) {
	event.preventDefault();
	if (event.target.nodeName === 'A') {
		linkedSection = document.getElementById(event.target.classList[1]);
		linkedSection.scrollIntoView();
	}
	return;
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
sections.forEach((section) => builNavItem(section));

// Scroll to section on link click
navList.addEventListener('click', handleNavItemClick);

// Set sections as active

const activeSectionObserver = new IntersectionObserver(addActiveClass, {
	threshold: 0.5,
	rootMargin: '-6%',
});

sections.forEach((section) => {
	activeSectionObserver.observe(section);
});

// Scroll back to top when reaches the footer

function reachedBotttom(entry) {
	if (entry[0].isIntersecting) {
		scrollUpButtonWrapper.classList.add('inView');
	} else {
		scrollUpButtonWrapper.classList.remove('inView');
	}
}

const reachedBottomObserver = new IntersectionObserver(reachedBotttom, {
	threshold: 0.1,
});

reachedBottomObserver.observe(footer);

// Add event and return to the top when the button is clicked

scrollUpButton.addEventListener('click', scrollToTop);

/**
 * Navigation toggle for mobile devices
 *
 */

const primaryNav = document.querySelector('.navbar__menu');
const navToggle = document.querySelector('.navbar__toggle');

navToggle.addEventListener('click', () => {
	const visibility = primaryNav.getAttribute('data-visible');

	if (visibility === 'false') {
		primaryNav.setAttribute('data-visible', true);
		navToggle.setAttribute('aria-expanded', true);
	} else {
		primaryNav.setAttribute('data-visible', false);
		navToggle.setAttribute('aria-expanded', false);
	}
});
