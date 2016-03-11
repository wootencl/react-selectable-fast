module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    publicPath: '',
    filename: 'react-selectable-extended.js',
    library: 'Selectable',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
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
    modulesDirectories: ['node_modules'],
  }
}
