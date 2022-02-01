/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
    publicPath: '/',
    library: {
      name: 'web-code-editor',
      type: 'umd',
      export: 'default',
    },
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
    ],
	},
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
