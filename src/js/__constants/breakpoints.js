/**
 * --------------------------------------------------------------------------
 * Breakpoints
 * --------------------------------------------------------------------------
 */
import $ from 'jquery';
import PubSub from 'pubsub-js';

const Point = function Point() {
	let data = window.getComputedStyle(document.body, '::before').getPropertyValue('content').replace(/["'\s]/g, '');

	data = data.slice(1, -1);

	const dataArr = data.split(',');
	dataArr.unshift('zero:0px');

	function checkBreakpoint() {
		dataArr.forEach((val, i) => {
			const breakpoint = val.split(':');
			const [breakpointName] = breakpoint;
			const currValue = breakpoint[1].slice(0, -2) * 1;
			let nextValue;
			let query;

			if (i !== dataArr.length - 1) { nextValue = dataArr[i + 1].split(':')[1].slice(0, -2) - 1; }

			if (i === 0) {
				query = window.matchMedia(`screen and (max-width: ${nextValue}px)`);
			} else if (i === dataArr.length - 1) {
				query = window.matchMedia(`screen and (min-width: ${currValue}px)`);
			} else {
				query = window.matchMedia(`screen and (min-width: ${currValue}px) and (max-width: ${nextValue}px)`);
			}

			function change() {
				if (query.matches) {
					PubSub.publish('breakpoint', [breakpointName, currValue]);
				}
				return null;
			}
			change();
			query.addListener(change);
		});
	}

	checkBreakpoint();
};

const $code = $('#breakpoint');

function setDeviceInfo(name, value) {
	$code.text(`${value[0]}, min-width: ${value[1]}px`);
}
PubSub.subscribe('breakpoint', setDeviceInfo);

export default Point;
