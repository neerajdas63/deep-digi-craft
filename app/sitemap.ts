import { MetadataRoute } from 'next'

// 👉 future me yaha se blog fetch karoge
const posts = [
  // abhi empty rakho (demo blogs avoid)
]

const categories = [
  'ai-tools',
  'finance',
  'trading',
  'tech-gadgets',
  'productivity',
  'business'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://allblogsidea.com'

  // main pages
  const pages = [
    '',
    '/blog',
    '/about',
    '/contact'
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }))

  // categories
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
  }))

  // blog posts (future use)
  const postUrls = posts.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
  }))

  return [...pages, ...categoryUrls, ...postUrls]
}