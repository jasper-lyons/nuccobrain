import $ from 'jquery';

const smoothScroll = () => {
	// Cache DOM
	const body = $('html, body');
	const heroSection = $('.hero');
	// const scrollBtn = heroSection.find('.scroll-btn');
	// const nextElement = heroSection.next();
	const contactBtn = $('#contact-btn');
	const contactSection = $('.contact');
	const headerNav = $('.header__nav');
	const mobileMenuTrigger = $('.header__menu-trigger');

	// Bind events
	// if (scrollBtn.length && nextElement.length) {
	// 	scrollBtn.on('click', () => {
	// 		body.animate({
	// 			scrollTop: (nextElement.offset().top - $('header.header').outerHeight()) + 1,
	// 		}, 500);
	// 	});
	// }

	if (contactBtn.length && contactSection.length) {
		contactBtn.on('click', (e) => {
			e.preventDefault();
			body.animate({
				scrollTop: (contactSection.offset().top - $('header.header').outerHeight()) + 25,
			}, 500);
			headerNav.removeClass('header__nav--menu-opened');
			mobileMenuTrigger.removeClass('btn--menu-open');
			body.removeClass('modal-opened');
		});
	}
};

export default smoothScroll;
