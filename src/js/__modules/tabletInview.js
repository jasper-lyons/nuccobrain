import $ from 'jquery';

const section = $('.section.projects');
const windowHeight = $(window).height();
const halfHeight = windowHeight * 0.5;
const tablet = window.matchMedia('screen and (max-width: 1025px)');

function hideItems() {
	section.find('.project').removeClass('hover-item');
}

function showItems() {
	section.find('.project').addClass('hover-item');
}

function showItemsInit() {
	if ((section.length > 0) && (tablet.matches)) {
		const thisTop = section.offset().top - $(window).scrollTop();
		if ((thisTop <= halfHeight) && (thisTop > 0)) {
			showItems();
		} else if (thisTop <= 0) {
			hideItems();
		} else if (thisTop >= halfHeight) {
			hideItems();
		}
	}
}

export default showItemsInit;
