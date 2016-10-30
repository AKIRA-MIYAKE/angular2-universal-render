'use strict';
const webpack = require('webpack');

module.exports = {
  entry: {
    'index': './test/index.ts'
  },
  output: {
    path: './test',
    filename: '[name].js'
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