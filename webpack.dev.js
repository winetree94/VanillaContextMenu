const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/Entry.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ['ts-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.css']
  },
  output: {
    library: 'VanillaContext',
    libraryTarget: 'umd',
    path: path.join(__dirname, './dist'),
    filename: 'vanilla-context.min.js'
  },
  devServer: {
    port: 9009
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject : 'head',
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'vanilla-context.min.css'
    })
  ]
};
