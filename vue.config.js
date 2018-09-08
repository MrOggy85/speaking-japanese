module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/speaking-japanese'
    : '',
  apiEndpoint: process.env.NODE_ENV === 'production'
    ? '209.97.173.26'
    : 'localhost',
};
