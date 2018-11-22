import $ from 'jquery';

const openVideoModal = () => {
	// Cache DOM
	const body = $('body');
	const $document = $(document);
	const heroSection = $('.hero');
	const openBtn = heroSection.find('.scroll-btn');

	// Functions
	const showModal = () => {
		const modalContent = `
		<div class="modal-popup modal-popup--video">
			<div class="modal-popup__content modal-popup__content--visible">
				<button class="btn modal-popup__close-btn">x</button>
				<div class="iframe-wrapper"><iframe src="//player.vimeo.com/video/288230749?autoplay=1" frameborder="0" allowfullscreen=""></iframe></div>
			</div>
		</div>
		`;
		
		body.find('.modal-popup').remove();
		body.append(modalContent).addClass('modal-opened').find('.modal-popup').fadeIn();
	} 

	const restoreBody = (modal) => {
		modal.fadeOut(400, () => {
			modal.remove();
			body.removeClass('modal-opened');
		});
	};


	// Bind events
	if (openBtn.length) {
		openBtn.on('click', () => {
			showModal();
		});
	}

	$document.on('click touchstart', '.modal-popup', (e) => {
		const target = $(e.target);

		if (target.is('.modal-popup')) {
			restoreBody(target);
		}

		if (target.is('.modal-popup__close-btn')) {
			restoreBody(target.closest('.modal-popup'));
		}
	});

	$document.on('keyup', (e) => {
		e.preventDefault();
		if (e.keyCode === 27) {
			const modal = $('.modal-popup');
			if (modal) {
				restoreBody(modal);
			}
		}
	});
};

export default openVideoModal;
