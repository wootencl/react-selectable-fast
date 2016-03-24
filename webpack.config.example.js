const path = require('path')

module.exports = {
  devtool: 'eval',
  debug: true,
  entry: './example/example.js',
  output: {
    path: './example',
    publicPath: '',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    root: path.resolve(__dirname),
    modulesDirectories: ['node_modules', 'dist']
  }
}
