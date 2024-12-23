const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = (webpackConfigEnv, argv) => {
  const orgName = "cpTech";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
    
  });

  return merge(defaultConfig, {
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new ModuleFederationPlugin({
        name: 'rootConfig',
        filename: 'remoteEntry.js',
        exposes: {
          './store': './src/redux/store', // Expose the store
        }
      }),
    ],
  });
};
