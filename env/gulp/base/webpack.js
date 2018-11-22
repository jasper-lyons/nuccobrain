let gulp         = require('gulp');
let $            = require('gulp-load-plugins')({ lazy: true });
let webpack      = require('webpack');
let config       = require('../../lib/getProjectConfig');
const gutilLog   = require('fancy-log');
const PluginError = require('plugin-error');


function getWebpack(cb, watch = false) {
  // Check if webpack is enabled in the configuration
  let webpackComponent = config('components.webpack');
  if (!webpackComponent) {
    return cb();
  }

  // Load settings from webpack.config.js
  let settings = require('../../../webpack.config');
  if (true === watch) {
    settings.watch = true;
  }

  // Run webpack
  webpack(settings, (err, stats) => {
    if (err) {
      throw new PluginError('webpack', err);
    }

    gutilLog('[webpack]', stats.toString());
    
    if (!settings.watch) {
      cb();
    }
  });
}

module.exports = {
  default: cb => {
    getWebpack(cb);
  },

  watch: cb => {
    if (config('components.hotLoader') === true) {
      cb();
      return;
    }

    getWebpack(cb, true);
  }
};
