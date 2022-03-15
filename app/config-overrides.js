const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config
  );

  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: {
      '@border-radius-base': '0px',
      '@border-radius-sm': '2px',
      '@btn-height-base': '40px',
      '@btn-height-lg': '48px',
      '@btn-height-sm': '32px',
      '@input-height-base': '40px',
      '@input-height-lg': '48px',
      '@input-height-sm': '32px',
    },
  })(config, env);

  return config;
};
