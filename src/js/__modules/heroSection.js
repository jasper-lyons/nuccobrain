import $ from 'jquery';
import Flickity from 'flickity';
import jQueryBridget from 'jquery-bridget';
import device from '../__constants/device';

jQueryBridget('flickity', Flickity, $);

const heroSection = () => {
	// Cache DOM
	const $document = $(document);
	const $window = $(window);

	// Functions
	function showContent() {
		const HeroVars = {};
		HeroVars.heroWrapper = $('.hero');
		HeroVars.videoPoster = HeroVars.heroWrapper.find('.video-poster');
		HeroVars.videoWrapper = HeroVars.heroWrapper.find('.video');
		HeroVars.video = HeroVars.videoWrapper.find('video');
		HeroVars.imageSlider = HeroVars.heroWrapper.find('.image-slider');
		HeroVars.slides = HeroVars.imageSlider.find('.image-slider__item');
		HeroVars.textSlider = HeroVars.heroWrapper.find('.text-slider');
		HeroVars.textSliderInstance = '';

		function fireTextSlider() {
			HeroVars.textSliderInstance = new Flickity(HeroVars.textSlider[0], {
				wrapAround: true,
				autoPlay: 4000,
				draggable: false,
				pageDots: false,
				prevNextButtons: false,
				pauseAutoPlayOnHover: false,
			});
			let prevWindowWidth = $window.width();
			$window.on('resize orientationchange', () => {
				const currentWindowWidth = $window.width();
				if (currentWindowWidth !== prevWindowWidth) {
					HeroVars.textSliderInstance.resize();
					HeroVars.textSlider.find('.flickity-viewport').css('height', '');
					prevWindowWidth = currentWindowWidth;
				}
			});
		}

		function fireImageSlider() {
			HeroVars.slides.each((i, element) => {
				$(element).attr('style', $(element).data('style'));
			});
			HeroVars.imageSlider.on('ready.flickity', () => {
				fireTextSlider();
			});
			HeroVars.imageSliderInstance = new Flickity(HeroVars.imageSlider[0], {
				fullscreen: true,
				wrapAround: true,
				autoPlay: 4000,
				draggable: false,
				pageDots: false,
				prevNextButtons: false,
				pauseAutoPlayOnHover: false,
			});
		}

		function fireVideo() {
			HeroVars.videoPoster.attr('style', HeroVars.videoPoster.data('style'));
			HeroVars.video.attr('src', HeroVars.video.data('src'));
			HeroVars.video[0].oncanplaythrough = () => {
				HeroVars.videoPoster.fadeOut('fast', () => {
					HeroVars.videoPoster.remove();
				});
			};
		}

		// Pause Home Hero Video and Sliders When Modal Is Open
		function pauseHeroElems(isMobile) {
			const observer = new MutationObserver((e) => {
				const addedElems = e[0].addedNodes;
				const removedElems = e[0].removedNodes;

				$(addedElems).each((i, element) => {
					if ($(element).hasClass('modal-popup')) {
						if (isMobile) {
							HeroVars.imageSliderInstance.pausePlayer();
							HeroVars.textSliderInstance.pausePlayer();
						} else {
							HeroVars.video[0].pause();
							HeroVars.textSliderInstance.pausePlayer();
						}
						return false;
					}
				});

				$(removedElems).each((i, element) => {
					if ($(element).hasClass('modal-popup')) {
						if (isMobile) {
							HeroVars.imageSliderInstance.unpausePlayer();
							HeroVars.textSliderInstance.unpausePlayer();
						} else {
							HeroVars.video[0].play();
							HeroVars.textSliderInstance.unpausePlayer();
						}
						return false;
					}
				});
			});
			observer.observe(document.body, { childList: true });
		}

		if (HeroVars.heroWrapper.length) {
			if (device.isPhone() || $window.width() < 768) {
				HeroVars.videoWrapper.remove();
				HeroVars.videoPoster.remove();
				fireImageSlider();
				pauseHeroElems(true);
			} else {
				HeroVars.imageSlider.remove();
				fireVideo();
				fireTextSlider();
				pauseHeroElems();
			}
		}
	}

	// Bind events
	$document.ready(showContent);
};

export default heroSection;
