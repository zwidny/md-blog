const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const theme = require('../src/theme');


const __repo = path.dirname(__dirname);
module.exports = {
  mode: 'production',
  entry: {
    'index': path.join(__repo, "src/index.jsx")
  },
  output: {
    path: path.resolve(__repo, "build"),
    filename: `bundle.js`,
  },
  externals: {
    'highlight.js': 'hljs',
    'lodash': '_',
    'moment': 'moment',
    'd3': 'd3',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', "stage-1", "react", "minify"],
            plugins: [
              ["transform-decorators-legacy"],
              ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": true}] // `style: true` 会加载 less 文件
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            javascriptEnabled: true,
            modifyVars: theme
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      // {
      //   // test: /\.(png|jpg|gif)$/,
      //   exclude: [/\.html$/, /\.(js|jsx)$/, /\.css$/, /\.json$/],
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: `media/[name].[ext]`
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')},
      'SERVICE_URL': JSON.stringify('http://api.zwidny.com')
    }),
    new MinifyPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
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
    }),
  ]
};