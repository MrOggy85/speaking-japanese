module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/speaking-japanese'
    : '',
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
};
