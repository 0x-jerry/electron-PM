const path = require('path')

module.exports = {
  target: 'electron-renderer',
  entry: './app/src/entry.js',
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'app/build'),
    publicPath: 'build/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        },{
          loader: 'css-loader'
        },{
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
}