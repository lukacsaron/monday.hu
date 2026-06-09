import type { MetadataRoute } from 'next';

const BUILD_DATE = new Date('2026-06-09');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://monday.hu/',
      lastModified: BUILD_DATE,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
