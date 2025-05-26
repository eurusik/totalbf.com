/**
 * Footer navigation links configuration
 */

const footerLinks = {
  home: {
    url: '/',
    translationKey: 'navigation.home',
  },
  news: {
    url: '/posts/',
    translationKey: 'navigation.news',
  },
  categories: {
    url: '/categories/',
    translationKey: 'navigation.categories',
  },
  rss: {
    url: '/feed.xml',
    translationKey: 'navigation.rss',
    external: true,
  },
  sitemap: {
    url: '/sitemap.xml',
    translationKey: 'navigation.sitemap',
    external: true,
  },
};

export default footerLinks;
