const path = require('path')

module.exports = {
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  devtool: 'eval',
  entry: path.resolve(__dirname, 'example.js'),
  output: {
    path: path.resolve(__dirname, 'example'),
    publicPath: '',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    modules: ['node_modules', 'dist'],
  },
}
