const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  watch: process.env.NODE_ENV === 'development',
  target: 'electron',
  entry: './app/src/entry.js',
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

  plugins: [
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css",
      allChunks: true
    })
     
  ]
}