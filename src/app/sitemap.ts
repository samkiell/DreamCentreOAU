import { MetadataRoute } from 'next';
import { getMetadata } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteData = getMetadata();
  const baseUrl = siteData.url;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
