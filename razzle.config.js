const loadableWebpack = require("react-loadable/webpack");
const path = require("path");
const webpack = require("webpack");

const loadableJasonPath = path.resolve(
  __dirname,
  "build",
  "react-loadable.json"
);

const { ReactLoadablePlugin } = loadableWebpack;
const loadablePlugin = new ReactLoadablePlugin({
  filename: loadableJasonPath
});
const ignorePlugin = new webpack.WatchIgnorePlugin([loadableJasonPath]);

module.exports = {
  modify: (config = { plugins: [] }) => {
    config.plugins.push(ignorePlugin);
    config.plugins.push(loadablePlugin);
    return config;
  }
};
