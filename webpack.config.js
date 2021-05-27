const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app: path.join(src, 'index.ts'),
    sw: path.join(src, 'sw.ts'),
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: dist,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(src, 'index.html'),
      favicon: './src/favicon.svg',
    }),
    new HtmlWebpackPlugin({
      filename: 'fallback.html',
      template: path.join(src, 'fallback.html'),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.pug'],
    alias: {
      Components: path.join(src, 'components'),
      Css: path.join(src, 'css'),
      Templates: path.join(src, 'templates'),
    },
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
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
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ],
  },
};
