const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const vueLoader = require('vue-loader')
const path = require('path')
const transpileDependencies = [
	'regexpu-core',
	'strip-ansi',
	'ansi-regex',
	'ansi-styles',
	'react-dev-utils',
	'chalk',
	'unicode-match-property-ecmascript',
	'unicode-match-property-value-ecmascript',
	'acorn-jsx',
	'@znck[\\\\/]prop-types'
]

module.exports = {
	title: 'META Playground',
	components: 'src/components/**/[A-Z]*.vue',
	defaultExample: false,
	serverPort: 7100,
	version: '1.1.1',
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					test: /\.js$/,
					exclude: modulePath =>
						(/node_modules/.test(modulePath) ||
							/packages[\\/]vue-styleguidist[\\/]lib/.test(modulePath)) &&
						!transpileDependencies.some(mod =>
							new RegExp(`node_modules[\\\\/]${mod}[\\\\/]`).test(modulePath)
						),
					use: {
						loader: 'babel-loader',
						options: {
							sourceType: 'unambiguous',
							presets: [
								[
									'@babel/preset-env',
									{
										useBuiltIns: 'usage',
										corejs: 2,
										targets: {
											ie: '11'
										}
									}
								]
							],
							comments: false
						}
					}
				},
				// {
				// 	test: /\.css$/,
				// 	use: ['style-loader', 'css-loader']
				// }
				{
					test: /\.(css?|scss|sass)(\?.*)?$/,
					use: [
						"style-loader",
						"css-loader",
						"sass-loader",
						// {
						// 	loader: "sass-resources-loader",
						// 	options: {
						// 		// resources: [
						// 		// // path.join(__dirname, "./assets/css/variables.scss"),
						// 		// // path.join(__dirname, "something else"),
						// 		// ],
						// 	},
						// },
					],
				},
			]
		},

		plugins: [new vueLoader.VueLoaderPlugin()].concat(
			process.argv.includes('--analyze') ? [new BundleAnalyzerPlugin()] : []
		)
	},
	usageMode: 'expand',
	exampleMode: 'expand',
	editorConfig: {
		theme: 'solarized dark'
	},
	compilerConfig: {
		target: { ie: 11 }
	},
	require: [path.join(__dirname, 'styleguide/global.requires.js')],
	styleguideDir: 'dist',
	codeSplit: true // extract compiler and editor to accelerate first load
}
