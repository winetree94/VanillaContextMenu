const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/Entry.ts',
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
    extensions: ['.ts', '.js']
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
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
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
