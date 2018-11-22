import $ from 'jquery';
import device from '../__constants/device';

/**
 * --------------------------------------------------------------------------
 * View
 * --------------------------------------------------------------------------
 */

const view = function view() {
	// Cache DOM

	const $document = $(document);

	// Functions

	function showLog() {
		console.log('Show log function');

		if (device.isPhone()) {
			console.log('You are using a phone');
		} else {
			console.log('You are not using a phone');
		}

		if (device.isTablet()) {
			console.log('You are using a tablet');
		} else {
			console.log('You are not using a tablet');
		}
	}

	// Bind events

	$document.ready(showLog);
};

export default view;
