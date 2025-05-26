const siteConfig = require('./src/config/site-config').default;

module.exports = {
  locales: ['en', siteConfig.defaultLocale],
  defaultLocale: siteConfig.defaultLocale,
  localeDetection: true,
};
