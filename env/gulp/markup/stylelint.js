const gulp = require('gulp');
const gulpStylelint = require('gulp-stylelint');
const config = require('../../lib/getProjectConfig');

gulp.task('stylelint', () => {
	return gulp.src([
		`${config('paths.source')}/**/*.{sass,scss}`,
      `!${config('paths.source')}/**/__vendors{,/**}`
	])
		.pipe(gulpStylelint({
			configFile: '.stylelintrc.json',
			failAfterError: false,
			reporters: [
				{ formatter: 'string', console: true }
			]
		}));
});
