import $ from 'jquery';

const mobileMenu = () => {
	// Cache DOM
	const $document = $(document);
	const body = $('body');
	const headerNav = $('.header__nav');
	const mobileMenuTrigger = $('.header__menu-trigger');

	// Bind events
	mobileMenuTrigger.on('click', () => {
		if (!headerNav.hasClass('header__nav--menu-opened')) {
			mobileMenuTrigger.addClass('btn--menu-open');
			headerNav.addClass('header__nav--menu-opened');
			body.addClass('modal-opened');
		} else {
			headerNav.removeClass('header__nav--menu-opened');
			mobileMenuTrigger.removeClass('btn--menu-open');
			body.removeClass('modal-opened');
		}
	});
	$document.on('click touchstart', (e) => {
		if (!$(e.target).closest('.header__nav').length && !$(e.target).is('.header__menu-trigger') && headerNav.hasClass('header__nav--menu-opened')) {
			headerNav.removeClass('header__nav--menu-opened');
			mobileMenuTrigger.removeClass('btn--menu-open');
			body.removeClass('modal-opened');
		}
	});
};

export default mobileMenu;
