import "@babel/polyfill";

import heroSection from './__modules/heroSection';
import mobileMenu from './__modules/mobileMenu';
import headerFill from './__modules/headerFill';
import smoothScroll from './__modules/smoothScroll';
import queryPosts from './__modules/queryPosts';
import getProjectData from './__modules/getProjectData';
import showProjectModal from './__modules/showProjectModal';
import projectsGrid from './__modules/projectsGrid';
import testimonialsSlider from './__modules/testimonialsSlider';
import equalHeightCat from './__modules/equalHeightCat';
import adjustments from './__modules/adjustments';
import openVideoModal from './__modules/openVideoModal';
import showItemsInit from './__modules/tabletInview';
import startAnimations from './__modules/animations';
import fetchEvents, {fetchFutureEvents, fetchPastEvents} from './__modules/fetchEvents'

heroSection();

document.addEventListener('DOMContentLoaded', () => {
	openVideoModal();
	queryPosts();
	mobileMenu();
	headerFill();
	smoothScroll();
	getProjectData();
	showProjectModal();
	testimonialsSlider();
	projectsGrid();
	equalHeightCat();
	adjustments();
	showItemsInit();
	startAnimations();
	fetchEvents();
});

window.addEventListener('load', () => {
});

window.addEventListener('resize', () => {
	adjustments();
});

window.addEventListener('scroll', () => {
	showItemsInit();
});
