import $ from 'jquery';
import 'jquery-match-height';

const equalHeightCat = () => {
	// Cache DOM
	const categoriesCol = $('.categories__grid');
	const title = categoriesCol.find('.categories__title');
	const subtitle = categoriesCol.find('.categories__subtitle');
	const text = categoriesCol.find('.categories__text');

	// Functions
	function setHeight() {
		title.matchHeight();
		subtitle.matchHeight();
		text.matchHeight();
	}

	if (categoriesCol.length) {
		setHeight();
	}
};

export default equalHeightCat;
