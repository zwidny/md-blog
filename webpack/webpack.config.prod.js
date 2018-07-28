const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const __repo = path.dirname(__dirname);
module.exports = {
  mode: 'production',
  entry: {
    'index': __repo + "/src/index.jsx"
  },
  output: {
    path: path.resolve(__repo, "build"),
    filename: `bundle.[name].js`,
    publicPath: "./"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', "stage-1", "react"],
            plugins: [
              [
                "transform-decorators-legacy"
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // test: /\.(png|jpg|gif)$/,
        exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `media/[name].[ext]`
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: __repo + "/public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      extractComments: true,
      uglifyOptions: {
        ecma: 8,
        warnings: false,
      }
    })
  ],
};