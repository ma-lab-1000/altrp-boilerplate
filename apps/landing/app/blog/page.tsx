import { CollectionLayout } from '@lnd/ui/templates/CollectionLayout'
import { ProductList } from '@lnd/ui/components/ecommerce'
import type { Viewport } from 'next'
import { generateMetadata } from '@lnd/utils/seo/metadata'
import { normalizeFrontmatter } from '@lnd/utils/content/frontmatter'

// Generate SEO metadata for the blog page
export const metadata = generateMetadata({
  title: 'Blog - LND Boilerplate',
  description: 'Latest articles, tutorials, and insights about web development and the LND Boilerplate.',
  keywords: ['blog', 'web development', 'tutorials', 'insights', 'LND Boilerplate'],
  type: 'website',
  url: 'https://lnd-boilerplate.com/blog'
}, {
  siteName: 'LND Boilerplate',
  siteUrl: 'https://lnd-boilerplate.com'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function BlogPage() {
  const blogPosts = [
    {
      id: '1',
      title: 'Getting Started with LND Boilerplate',
      description: 'Learn how to set up and use the LND Boilerplate for your next landing page project.',
      image: {
        src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop',
        alt: 'Code editor with TypeScript'
      },
      tags: ['Tutorial', 'Getting Started'],
      date: '2025-01-25',
      author: 'LND Team',
      href: '/blog/getting-started'
    },
    {
      id: '2',
      title: 'Building Custom Components',
      description: 'A comprehensive guide to creating and customizing components in the LND UI library.',
      image: {
        src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
        alt: 'Component architecture diagram'
      },
      tags: ['Components', 'UI Library'],
      date: '2025-01-24',
      author: 'LND Team',
      href: '/blog/custom-components'
    },
    {
      id: '3',
      title: 'MDX Content Management',
      description: 'How to use MDX for content management and create dynamic, interactive pages.',
      image: {
        src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
        alt: 'Markdown and JSX'
      },
      tags: ['MDX', 'Content'],
      date: '2025-01-23',
      author: 'LND Team',
      href: '/blog/mdx-content'
    },
    {
      id: '4',
      title: 'Performance Optimization Tips',
      description: 'Best practices for optimizing your LND Boilerplate application for maximum performance.',
      image: {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
        alt: 'Performance metrics dashboard'
      },
      tags: ['Performance', 'Optimization'],
      date: '2025-01-22',
      author: 'LND Team',
      href: '/blog/performance-tips'
    }
  ]

  // Normalize frontmatter data for each blog post
  const normalizedPosts = blogPosts.map(post => ({
    ...post,
    ...normalizeFrontmatter({
      title: post.title,
      description: post.description,
      date: post.date,
      author: post.author,
      tags: post.tags,
      image: post.image?.src
    }),
    // Ensure image property maintains the correct structure
    image: post.image
  }))

  return (
    <CollectionLayout
      title="Blog"
      description="Latest articles, tutorials, and insights about web development and the LND Boilerplate."
    >
      <ProductList
        items={normalizedPosts}
        columns={2}
      />
    </CollectionLayout>
  )
}
