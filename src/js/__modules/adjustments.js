import $ from 'jquery';

const adjustments = () => {
	// Cache DOM
	const $window = $(window);
	const imgTriggers = $('.projects .project');

	// Bind events	
	if ($window.width() < 768) {
		imgTriggers.addClass('modal-trigger-project');
	} else {
		imgTriggers.removeClass('modal-trigger-project');	
	}
};

export default adjustments;
