/*
|--------------------------------------------------------------------------
| Html
|--------------------------------------------------------------------------
|
| Handle processing HTML files. Allow using gulp-include.
|
*/

let gulp   = require('gulp');
let config = require('../../lib/getProjectConfig');
let $      = require('gulp-load-plugins')({ lazy: true });
const fileinclude = require('gulp-file-include');

module.exports = {

  /**
   * Copy HTML files from source and process them.
   */
  default: () => {
    let task = gulp.src([
      `${config('paths.source')}/**/*.html`,
      `!${config('paths.source')}/**/__*{,/**}`
    ])
      .pipe($.plumber())

    if (true !== global.isWatching) {
      task = task.pipe($.changed(config('paths.public')))
    }

    task = task
      // Allow to use includes in HTML files
      .pipe($.include())
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))

      .pipe(gulp.dest(config('paths.public')))

    return task;
  }
};
