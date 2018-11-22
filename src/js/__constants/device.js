/**
 * --------------------------------------------------------------------------
 * Device
 * --------------------------------------------------------------------------
 */

const device = {

	isPhone: () => {
		if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			return true;
		}
		return false;
	},

	isTablet: () => {
		if (/iPad/i.test(navigator.userAgent)) {
			return true;
		}
		return false;
	},

};

export default device;
