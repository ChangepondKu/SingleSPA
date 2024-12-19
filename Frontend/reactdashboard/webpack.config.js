const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const webpack = require('webpack'); // Import Webpack
require('dotenv').config()

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "cpTech",
    projectName: "reactdashboard",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins : [
      new CspHtmlWebpackPlugin(
        {
          'script-src': ["'self'", 'https://cdn.jsdelivr.net', "'unsafe-eval'"],
          'style-src': ["'self'", "'unsafe-inline'"],
        },
        {
          // Optional options
          enabled: true, // Enable CSP injection
          hashingMethod: 'sha256', // Add integrity hashing if needed
        }
      ),
      new webpack.DefinePlugin({
        // Expose environment variables starting with REACT_APP_ to the frontend
        'process.env': JSON.stringify(process.env),
      }),
    ]
    // modify the webpack config however you'd like to by adding to this object
  });
};
