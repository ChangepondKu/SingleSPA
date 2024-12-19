const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const webpack = require('webpack'); // Import Webpack
require('dotenv').config()

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "cpTech",
    projectName: "reactLoginPage",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins: [
      new ModuleFederationPlugin({
        name: 'react-LoginPage', // Unique name for the micro-application
        remotes: {
          rootConfig: 'rootConfig@http://localhost:9000/remoteEntry.js', // Reference to root-config
        },
      }),
      new webpack.DefinePlugin({
        // Expose environment variables starting with REACT_APP_ to the frontend
        'process.env': JSON.stringify(process.env),
      }),
    ],
  });
};
