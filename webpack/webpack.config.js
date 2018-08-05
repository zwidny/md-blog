const path = require('path');
const webpack = require('webpack');
const __repo = path.dirname(__dirname);
const theme = require('../src/theme');

module.exports = {
  entry: {
    'index': path.join(__repo, 'src/index.jsx'),
  },
  mode: 'development',
  output: {
    path: path.resolve(__repo, "public"),
    filename: `[name].js`,
    // filename: `bundle.[name].js`,
    // publicPath: "/public/"
  },
  externals: {
    'highlight.js': 'hljs',
    'lodash': '_',
    'moment': 'moment',
    'd3': 'd3',
  },
  devServer: {
    contentBase: [path.join(__repo, 'public'),],
    compress: false,
    port: 9999,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
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
              ],
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
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       'css-loader',
      //       'sass-loader'
      //     ]
      //   })
      // },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },

      // {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=150000&name=[path][name].[ext]'}
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('development')},
      'SERVICE_URL': JSON.stringify('http://192.168.200.193:8000'),
    }),
    // new ExtractTextPlugin('common/base.css'),
    // new ExtractTextPlugin(),
  ]
};