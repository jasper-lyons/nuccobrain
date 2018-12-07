import $ from 'jquery';

const queryPosts = () => {
	// Cache DOM
	const postsWrapper = $('.blog__posts-grid');

	// Functions
	const injectPosts = (resp1, resp2) => {
		const posts = resp1[0];
		const categories = resp2[0];

		const catObj = {};
		categories.forEach((item) => {
			catObj[item.id] = [item.name, item.link];
		});

		const postsString = `${
			posts.map((post) => {
				let categoriesString = '';
				post.categories.forEach((catID) => {
					if (catObj.hasOwnProperty(catID)) {
						categoriesString += `<a href='${catObj[catID][1]}' target="_blank">${catObj[catID][0]}</a>, `;
					}
				});
				categoriesString = categoriesString.slice(0, -2);

				return `
					<div class="blog__post">
						<a href="${post.link}" class="blog__post-inner" target="_blank">
							<div class="blog__post-image" style="background-image: url(${post._embedded['wp:featuredmedia']['0'].media_details.sizes['post-thumbnail'].source_url})"></div>
							<h3 class="blog__post-title">${post.title.rendered}</h3>
						</a>
						${categoriesString && `<p class="blog__post-categories">${categoriesString}</p>`}
					</div>
				`;
			}).join('')
		}`;

		if (postsString) {
			postsWrapper.html(postsString);
		}
	};

	const handleError = () => {
		const info = "<p class='section__text'>There was a problem fetching posts. Please visit <a href='http://nuccobrain.com/blog' target='_blank' style='text-decoration: underline;'>our blog</a>.</p>";
		postsWrapper.after(info).remove();
	};

	const getPosts = () => $.ajax({
		url: 'https://nuccobrain.com/blog/wp-json/wp/v2/posts?_embed&per_page=3',
	});

	const getCategories = () => $.ajax({
		url: 'https://nuccobrain.com/blog/wp-json/wp/v2/categories',
	});

	const getPostsAndCategories = () => {
		$.when(getPosts(), getCategories()).then(injectPosts, handleError);
	};

	if (postsWrapper.length) {
		getPostsAndCategories();
	}
};

export default queryPosts;
