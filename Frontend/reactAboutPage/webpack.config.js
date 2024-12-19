const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;


module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "cpTech",
    projectName: "reactAboutPage",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new ModuleFederationPlugin({
        name: 'reactAboutPage', // Unique name for the micro-application
        remotes: {
          reactsignUpCmp: 'reactsignUpCmp@http://localhost:8081/remoteEntry.js', // Reference to root-config
        },
      }),
    ]
  });
};
