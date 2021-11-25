const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};