const path = require('path');
const webpack = require('webpack');
const __repo = path.dirname(__dirname);

module.exports = {
  entry: {
    'index': path.join(__repo, 'src/index.jsx'),
  },
  mode: 'development',
  output: {
    path: path.resolve(__repo, "public"),
    filename: `bundle.[name].js`,
    // filename: `bundle.[name].js`,
    // publicPath: "/public/"
  },
  devServer: {
    contentBase: [path.join(__repo, 'public'),],
    compress: false,
    port: 9090,
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
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
      'SERVICE_URL': JSON.stringify('http://192.168.55.117:9000')
    }),
  ]
};