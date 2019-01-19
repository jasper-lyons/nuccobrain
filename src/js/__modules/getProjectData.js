import $ from 'jquery';

const getProjectData = () => {
	// Cache DOM
	const projectPath = window.location.pathname;
	const projectWrapper = $('#project-wrapper');

	// Functions
	function getProjectId(path) {
		if (path.includes('project.html')) {
			const projectId = window.location.search.substr(4);
			return projectId;
		}
		return false;
	}

	function showProject(project) {
		const projectHtml = `
			<div class="section section--project-single project-single">
				<div class="container container--project-single">
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
			</div>
		`;
		projectWrapper.html(projectHtml);
	}

	function fetchProject() {

		const projectId = getProjectId(projectPath);

		if (projectId) {
			const url = `/.netlify/functions/get-projects?projectid=${projectId}`;

			$.ajax({
				url,
				dataType: 'json',
			}).done((data) => {
				showProject(data.project);
			}).fail(() => {
				document.location.href = '/';
			});
		}
	}

	// Bind events

	if (projectWrapper.length) {
		fetchProject();
	}
};

export default getProjectData;
