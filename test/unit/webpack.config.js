const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './index.ts'),
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  resolve: {
    modules: [ 'node_modules' ],
    extensions: [".*", ".ts", ".js"],
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader'],
        include: [ path.resolve(__dirname, '../../test'), path.resolve(__dirname, '../../src'), path.resolve(__dirname, '../../client') ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        include: [ path.resolve(__dirname, '../../test'), path.resolve(__dirname, '../../src'), path.resolve(__dirname, '../../client') ]
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        include: [ path.resolve(__dirname, '../../test'), path.resolve(__dirname, '../../src'), path.resolve(__dirname, '../../client') ]
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
        include: [ path.resolve(__dirname, '../../test'), path.resolve(__dirname, '../../src'), path.resolve(__dirname, '../../client') ]
      },
    ]
  },
  context: path.resolve(__dirname, '../../'),
  devtool: "#source-map",
};