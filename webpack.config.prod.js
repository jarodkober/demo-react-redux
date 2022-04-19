const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');

process.env.NODE_ENV = 'production';

module.exports = {
	devtool: 'source-map',
	entry: './src/index',
	mode: 'production',
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.(js|jsx)$/,
				use: ['babel-loader', 'eslint-loader']
			},
			{
				test: /(\.css)$/,
				use: [
					// Loaders run from the bottom up, so postcss-loader will run first.
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [() => [require('cssnano')]]
							},
							sourceMap: true
						}
					}
				]
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
			minify: {
				// see https://github.com/kangax/html-minifier#options-quick-reference
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			template: 'src/index.html'
		}),
		// Minify CSS and add a hash for cachebusting
		new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
		new webpack.DefinePlugin({
			'process.env.API_URL': JSON.stringify('http://localhost:3001'),
			// Build React in production mode
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		// Display bundle stats
		new webpackBundleAnalyzer.BundleAnalyzerPlugin({
			analyzerMode: 'static'
		})
	],
	target: 'web'
};
