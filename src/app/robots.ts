import { MetadataRoute } from 'next';
import { getMetadata } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  const siteData = getMetadata();
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteData.url}/sitemap.xml`,
  };
}
