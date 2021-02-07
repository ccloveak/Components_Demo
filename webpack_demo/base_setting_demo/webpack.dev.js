"use strict";

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "developement",
  entry: { index: "./src/index.js", search: "./src/search.js" },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: ["babel-loader"],
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.png$|\.jpg$|\.gif$|\.jpeg$/,
        use: [{ loader: "url-loader", options: { limit: 10240 } }],
      },
      {
        test: /\.woff$|\.otf$|\.woff2$|\.eot$|\.ttf$/,
        use: ["file-loader"],
      },
    ],
  },
};
