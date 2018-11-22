import $ from 'jquery';
import Flickity from 'flickity';
import jQueryBridget from 'jquery-bridget';

Flickity.setJQuery($);
jQueryBridget('flickity', Flickity, $);

const testimonialsSlider = () => {
	// Cache DOM
	const $window = $(window);
	const slidesWrapper = $('.testimonials');

	// Functions
	function fireSlider() {
		const flkty = new Flickity(slidesWrapper[0], {
			wrapAround: true,
			autoPlay: 10000,
			pauseAutoPlayOnHover: false,
			draggable: true,
			pageDots: false,
			arrowShape: 'M68.3,0l12.9,13L44.6,50l36.6,37l-12.9,13L18.8,50L68.3,0z',
		});

		flkty.on('select', () => {
			flkty.playPlayer();
		});

		slidesWrapper.on('click', () => {
			flkty.playPlayer();
		});

		let prevWindowWidth = $window.width();
		$window.on('resize orientationchange', () => {
			const currentWindowWidth = $window.width();
			if (currentWindowWidth !== prevWindowWidth) {
				flkty.resize();
				slidesWrapper.find('.flickity-viewport').css('height', '');
				prevWindowWidth = currentWindowWidth;
			}
		});
	}

	if (slidesWrapper.length) {
		fireSlider();
	}
};

export default testimonialsSlider;
