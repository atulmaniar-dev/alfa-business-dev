/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://weworkoffice.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/_next/', '/404'],
      },
    ],
    additionalSitemaps: [
      'https://weworkoffice.in/sitemap-0.xml',
    ],
  },
  exclude: [
    '/admin/*',
    '/api/*',
    '/404',
    '/500',
    '/server-sitemap.xml'
  ],
  transform: async (config, path) => {
    // Custom priority based on page importance
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.includes('/plans') || path.includes('/contact')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.includes('/about') || path.includes('/gallery')) {
      priority = 0.8;
    } else if (path.includes('/amenities')) {
      priority = 0.7;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};