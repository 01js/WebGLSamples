const CracoLessPlugin = require('craco-less');

module.exports = {
  reactScriptsVersion: "@01js/react-scripts" /* (default value) */,
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};