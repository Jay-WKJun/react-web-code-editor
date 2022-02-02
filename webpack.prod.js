/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
	entry: './index.ts',
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
				test: /\.(ts|js)x?$/,
			  use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: ['styled-components'],
          },
        },
			},
    ],
	},
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
