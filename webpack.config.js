const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: path.join(src, 'index.js'),
  mode: 'development',
  output: {
    filename: 'main.js',
    path: dist,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(src, 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.pug'],
    alias: {
      Components: path.join(src, 'components'),
      Css: path.join(src, 'css'),
      Templates: path.join(src, 'templates'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        type: 'asset',
        generator: {
          filename: 'static/img/[name].[hash][ext]',
        },
      },
      {
        test: /\.pug$/i,
        use: ['pug-loader'],
      },
    ],
  },
};
