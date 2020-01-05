const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ouput = path.resolve(__dirname, "dist");
const public = path.resolve(__dirname, "public");

const paths = {
  src: path.resolve(__dirname, "src"),
  ouput: path.resolve(__dirname, "dist"),
  public: path.resolve(__dirname, "public")
};

module.exports = {
  mode:'development',
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
  output: {
    path: __dirname + 'dist',
    filename: "bundle.[hash].js",
  },
  devServer: {
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ]
};