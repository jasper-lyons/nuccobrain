/*
|--------------------------------------------------------------------------
| Scripts
|--------------------------------------------------------------------------
|
| Contains tasks handling scripts.
| Default task builds a JS file using includes, similar to scss.
| Sample includes syntax (on top of main JS file):
| //=include relative/path/to/file.js
| //=require relative/path/to/file.js
|
| Or to include all files from folder:
| //=require scripts/** /*.js
|
| Folders starting with '__' are treated as source and not copied
| to public folder.
|
*/

const gulp = require('gulp');
const fs = require('fs');
const $ = require('gulp-load-plugins')({lazy: true});
const isProduction = require('../../lib/isProduction');
const config = require('../../lib/getProjectConfig');

module.exports = {
/**
 * Build javascript file from modules and place it in public folder.
 */
	default: () => {
		let task = gulp.src([
			`${config('paths.source')}/**/*.js`,
			`!${config('paths.source')}/**/__*{,/**}`
		])
			.pipe($.plumber())

			// Allow to use includes in JS files
			.pipe($.include());

		if (global.isWatching === true) {
			task = task.pipe($.changed(config('paths.public'), { hasChanged: $.changed.compareSha1Digest }));
		}

		task = task
			// Output unminified files
			.pipe(gulp.dest(config('paths.public')))

			// Minify files and output them with .min.js extension
			.pipe($.uglify())
			.pipe($.rename({extname: '.min.js'}))

			// Output minified files
			.pipe(gulp.dest(config('paths.public')));

		return task;
	},

	/**
	 * Lint JS files and check for coding standards infractions
	 * using ESLint.
	 */
	lint: () => {
		if (config('components').webpack === true) {
			return gulp.src([
				`${config('paths.source')}/**/*.js`
			])
				.pipe($.eslint({
					env: {
						browser: true,
						es6: true,
						jquery: true,
					},
					settings: {
						ecmascript: 6,
						jsx: true,
					},
					extends: 'airbnb-base'
				}))
				.pipe($.eslint.format(
					'stylish',
					fs.createWriteStream('reports/eslint-from-gulp')
				))
				.pipe($.eslint.format(
					'json',
					fs.createWriteStream('reports/eslint-from-gulp.json')
				));
		} else {
			return gulp.src([
				`${config('paths.source')}/**/*.js`,
				`!${config('paths.source')}/**/__*{,/**}`
			])
				.pipe($.eslint({
					env: {
						browser: true,
						es6: false,
						jquery: true,
					},
					settings: {
						ecmascript: 5,
						jsx: false,
					},
					extends: 'airbnb-base'
				}))
				.pipe($.eslint.format(
					'stylish',
					fs.createWriteStream('reports/eslint-from-gulp')
				))
				.pipe($.eslint.format(
					'json',
					fs.createWriteStream('reports/eslint-from-gulp.json')
				));
		}
	},
};
