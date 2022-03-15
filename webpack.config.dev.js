const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
	devServer: {
		historyApiFallback: true,
		overlay: true,
		stats: 'minimal'
	},
	devtool: 'cheap-module-source-map',
	entry: './src/index',
	mode: 'development',
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.(js|jsx)$/,
				use: ['babel-loader', 'eslint-loader']
			},
			{
				test: /(\.css)$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: 'src/favicon.ico',
			template: 'src/index.html'
		})
	],
	target: 'web'
};
