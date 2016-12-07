'use strict';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './index.ts'),
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname),
    filename: 'index.js'
  },
  
  target: 'node',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    loaders: [
      { test: /\.(jsx?|tsx?)$/, loaders: ['ts-loader', 'angular2-template-loader'], exclude: [/node_modules/] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: 'raw-loader' }
    ]
  },
  devtool: "#source-map",
  plugins: [
    new webpack.IgnorePlugin(/^vertx$/)
  ]
};