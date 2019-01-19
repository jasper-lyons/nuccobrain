import $ from 'jquery';
import jQueryBridget from 'jquery-bridget';
import Isotope from 'isotope-layout';

jQueryBridget('isotope', Isotope, $);

const projectsGrid = () => {
	// Cache DOM
	const gridSection = $('#projects-grid');
	const gridWrapper = gridSection.find('.projects-grid__container');
	const gridButtons = gridSection.find('.projects-grid__btn');

	// Functions
	const initializeIsotope = () => {
		// const items = $('.projects-grid__item');

		gridWrapper.isotope({
			itemSelector: '.projects-grid__item',
			layoutMode: 'fitRows',
			animationEngine: 'css',
			transitionDuration: 400,
			filter: '.all',
			// hiddenStyle: { opacity: 0 },
			// visibleStyle: { opacity: 1 },
			hiddenStyle: { opacity: 0, transform: 'scale(0.94)' },
			visibleStyle: { opacity: 1, transform: 'scale(1)' },
		});

		const positionFunc = Isotope.prototype._positionItem;
		Isotope.prototype._positionItem = function( item, x, y, isInstant ) {
			positionFunc(item, x, y, true);
		};

		// gridWrapper.isotope({ filter: '.all' });
		// gridSection.slideDown('fast');

		gridButtons.on('click', (e) => {
			// if (!$(e.target).hasClass('btn-active')) {
			// 	gridWrapper.isotope('shuffle');
			// }
			gridButtons.removeClass('btn-active');
			const btn = $(e.target);
			const filter = btn.data('filter');
			btn.addClass('btn-active');

			// gridWrapper.isotope('layout');

			gridWrapper.isotope({ filter });

			// items.each((i, element) => {
			// 	$(element).removeClass('featured');
			// });

			// const elems = gridWrapper.isotope('getFilteredItemElements');
			// $(elems.slice(0, 2)).addClass('featured');

			// gridWrapper.isotope('layout');
		});
	};

	const createHtml = (projects, className) => `${
		projects.map((project, i) => {			
			let title = '';
			let	subtitle = '';
			const name = project.name;

			if (name.indexOf('|') !== -1) {
				if (name.indexOf('||') !== -1) {
					title = name.split('||')[0].trim();
					subtitle = name.split('||')[1].trim();
				} else {
					title = name.split('|')[0].trim();
					subtitle = name.split('|')[1].trim();
				}
			} else {
				title = name;
				subtitle = '';
			}

			return `
				<a href="${project.url}" data-id="${project.id}" class="projects-grid__item ${className} modal-trigger ${(i === 0 || i === 1) && 'featured'}">
					<div class="projects-grid__item-background" style="background-image: url(${project.covers['404'] ? project.covers['404'] : project.covers.original});"></div>
					<div class="projects-grid__item-content">
						<h2 class="section__title section__title--grid">${title}</h2>
						${subtitle && `<p class="section__text section__text--grid">${subtitle}</p>`}
					</div>
				</a>				
			`;
		}).join('')
	}`;

	const showContent = (resp1, resp2, resp3, resp4) => {
		const elements1 = createHtml(resp1[0].projects, 'all');
		const elements2 = createHtml(resp2[0].projects, 'engagement');
		const elements3 = createHtml(resp3[0].projects, 'change');
		const elements4 = createHtml(resp4[0].projects, 'culture');
		const allElements = `${elements1 + elements2 + elements3 + elements4}`;

		gridWrapper.html(allElements);
		gridSection.slideDown(400, initializeIsotope);
		// gridWrapper.find('.projects-grid__item').slice(0, 2).addClass('featured');
		// gridSection.slideDown('fast');
		// initializeIsotope();
	};

	const handleError = () => {
		const info = "<p class='section__text'>There was a problem, please refresh the page and try again.</p>";
		gridSection.html('').addClass('section--error').append(info).slideDown('fast');
	};

	const host = (process.env.BACKEND_HOST)? process.env.BACKEND_HOST : "http://localhost:9000"

	const getCollection = (id) => $.ajax({
		url: `${host}/.netlify/functions/get-projects?collectionid=${id}`,
		dataType: 'json',
	});

	const getCollections = () => {
		const collectionId1 = '170029169';
		const collectionId2 = '168432761';
		const collectionId3 = '168437257';
		const collectionId4 = '168437579';
		$.when(
			getCollection(collectionId1),
			getCollection(collectionId2),
			getCollection(collectionId3),
			getCollection(collectionId4),
		).then(showContent, handleError);
	};

	// Bind events
	if (gridWrapper.length) {
		getCollections();
	}
};

export default projectsGrid;
