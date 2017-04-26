var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

// Use webpack dev server
config.entry = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  '../assets/js/app.js'
]

// override django's STATIC_URL for webpack bundles
config.output.publicPath = 'http://localhost:3000/assets/bundles/'

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new BundleTracker({filename: './webpack-stats.json'}),
])
config.devtool = 'inline-source-map'

// Add a loader for JSX files with react-hot enabled
config.module.rules.push(
  { 
    test: /\.jsx?$/, 
    exclude: /node_modules/, 
    loaders: ['babel-loader'] 
  }
)

module.exports = config
