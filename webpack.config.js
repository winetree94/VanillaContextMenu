const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    path: __dirname + "dist",
    filename: "bundle.[hash].js"
  },
  devServer: {
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ]
};
