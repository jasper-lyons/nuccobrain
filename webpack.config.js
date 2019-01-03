const webpack = require('webpack');
const path = require('path');
const formatter = require('eslint/lib/formatters/html');

const settings = {
	context: path.join(__dirname, 'src'),
	entry: [
		'.', 'js', 'scripts.js'
	].join(path.sep),
	output: {
		path: path.join(__dirname, 'web', 'js'),
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	mode: 'development',
	module: {
		rules: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				use: {
					loader: "babel-loader",
					options: {
					  presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.jsx?/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'eslint-loader',
					options: {
						emitError: false,
						emitWarninig: false
					}
				}
			}
		]
	},
	plugins: []
};

// Uncomment code below if you want to use hot loader
// settings.entry.push('webpack/hot/dev-server', 'webpack-hot-middleware/client');
// settings.plugins.push([
// 	new webpack.HotModuleReplacementPlugin(),
// ]);

// Bundle will be optimized when run with --production flag.
// This is useful for running it as a task in the task runner.
if (process.argv.indexOf('--production') >= 0) {
	settings.mode = 'production',
	settings.module.rules.pop()
}
module.exports = settings;
