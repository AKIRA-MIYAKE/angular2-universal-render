'use strict';
const webpack = require('webpack');

module.exports = {
  entry: {
    'bundle': './example/client.ts',
    'rendering': './example/rendering.ts'
  },
  output: {
    path: './example',
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