const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
//const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
  entry: ['./src/scripts/game.js', './webpack/credits.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/scripts/'),
    },
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      gameName: 'My Phaser Game',
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' },
      //{ from: 'pwa', to: '' },
      { from: 'src/favicon.ico', to: '' },
    ]),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),

    /*new InjectManifest({
      swSrc: path.resolve(__dirname, '../pwa/sw.js')
    })*/
  ],
}
