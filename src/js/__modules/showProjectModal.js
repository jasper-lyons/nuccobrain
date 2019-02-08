import $ from 'jquery';

const showProjectModal = () => {
	// Cache DOM
	const body = $('body');
	const $document = $(document);

	// Functions

	function showModal(projectHtml) {
		const modalInnerContent = `
			<div class="modal-popup__content">
				<button class="btn modal-popup__close-btn">x</button>
				${projectHtml}
			</div>
		`;

		const popup = body.find('.modal-popup');
		popup.append(modalInnerContent);
		popup.find('.modal-popup__content').fadeIn();
		popup.find('.modal-popup__preloader').fadeOut();
	}

	function createProject(project) {
		const projectHtml = `
			<div class="project-single">
				<h1 class="section__title">${project.name}</h1>
				<p class="section__text">${project.description}</p>
				<hr>
				<div class="project-single__media-wrapper">
				${
					project.modules.map((element) => {
						let result = '';
						switch (element.type) {
							case 'image':
								result = `<img src="${element.sizes.max_1240 ? element.sizes.max_1240 : element.sizes.original}" title="${element.title ? element.title : ''}">`;
								break;
							case 'embed':
								result = `<div class="video-wrapper">${element.embed}</div>`;
								break;
							case 'text':
								result = `<div class="text-wrapper">${element.text}</div>`;
								break;
							default:
								break;
						}
						return `<div class="project-single__media-item">${result}</div>`;
					}).join('')
				}
				</div>
			</div>
		`;
		showModal(projectHtml);
	}

	function fetchProject(projectId) {
		const modalContent = `
		<div class="modal-popup">
			<span class="modal-popup__preloader">
				<img src="../img/icons/preloader.gif">
			</span>
		</div>
		`;
		
		body.find('.modal-popup').remove();
		body.append(modalContent).addClass('modal-opened').find('.modal-popup').fadeIn();

		if (projectId) {

			const url = `https://nuccobrain-staging.netlify.com/.netlify/functions/fetch-projects?projectid=${projectId}`;

			$.ajax({
				url,
				dataType: 'json',
			}).done((data) => {
				createProject(data.project);
			}).fail(() => {
				body.find('.modal-popup').remove();
				body.removeClass('modal-opened');
			});
		}
	}

	const restoreBody = (modal) => {
		modal.fadeOut(400, () => {
			modal.remove();
			body.removeClass('modal-opened');
		});
	};

	// Bind events

	$document.on('click', '.modal-trigger-project', (e) => {
		e.preventDefault();
		const projectId = $(e.target).closest('.modal-trigger-project').find('.modal-trigger').data('id');			
		fetchProject(projectId);
	});

	$document.on('click', '.modal-trigger', (e) => {
		e.preventDefault();
		e.stopPropagation();
		const projectId = $(e.target).closest('.modal-trigger').data('id');
		fetchProject(projectId);
	});

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

export default showProjectModal;
