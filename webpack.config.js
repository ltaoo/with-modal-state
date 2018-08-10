const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'with-modal-state.min.js',
    library: 'withModalState',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'index.js')],
        exclude: /node_modules/,
        options: {
          presets: ['env', 'es2015'],
        },
      },
    ],
  },
  externals: {
    react: 'react',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};
