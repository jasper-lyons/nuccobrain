import $ from 'jquery';

const headerFill = () => {
	// Cache DOM
	const body = $('body');
	const header = $('header.header');

	// Bind events
	if (!body.hasClass('header-static')) {
		$(document).on('scroll', () => {



			if ($(window).scrollTop() === 0) {
				header.removeClass('page-scrolled');
			} else {
				header.addClass('page-scrolled');
			}
		});
	}
};

export default headerFill;
