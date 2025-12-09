import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/editor/song/',
        '/editor/not-found',
      ],
    },
    sitemap: 'https://beamandbeat.com/sitemap.xml',
  };
}