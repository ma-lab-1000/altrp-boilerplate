import { PageLayout } from '@lnd/ui/templates/PageLayout'
import { generateMetadata } from '@lnd/utils/seo/metadata'
import { normalizeFrontmatter } from '@lnd/utils/content/frontmatter'
import type { Viewport } from 'next'

// Generate SEO metadata for the blog post
export const metadata = generateMetadata({
  title: 'Getting Started with LND Boilerplate - Complete Guide',
  description: 'Learn how to set up and use the LND Boilerplate for your next landing page project. Step-by-step guide with examples.',
  keywords: ['getting started', 'setup', 'tutorial', 'LND Boilerplate', 'Next.js', 'TypeScript'],
  type: 'article',
  url: 'https://lnd-boilerplate.com/blog/getting-started',
  publishedTime: '2025-01-25T10:00:00Z',
  modifiedTime: '2025-01-25T15:30:00Z',
  author: 'LND Team',
  section: 'Tutorials',
  tags: ['tutorial', 'getting started', 'setup', 'guide']
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

export default function GettingStartedPage() {
  const frontmatter = normalizeFrontmatter({
    title: 'Getting Started with LND Boilerplate',
    description: 'Learn how to set up and use the LND Boilerplate for your next landing page project.',
    date: '2025-01-25',
    author: 'LND Team',
    authorId: 'lnd-team',
    tags: ['Tutorial', 'Getting Started', 'Setup'],
    category: 'Tutorials',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    draft: false,
    featured: true
  })

  return (
    <PageLayout
      title={frontmatter.title}
      description={frontmatter.description}
      date={frontmatter.date}
      author={frontmatter.author}
      tags={frontmatter.tags}
      category={frontmatter.category}
      coverImage={frontmatter.coverImage}
    >
      <div className="prose prose-lg max-w-none">
        <h2>Introduction</h2>
        <p>
          Welcome to the LND Boilerplate! This comprehensive guide will walk you through setting up 
          and using our modern landing page boilerplate. Built with Next.js 14, TypeScript, and 
          Tailwind CSS, LND Boilerplate provides everything you need to create fast, beautiful, 
          and SEO-optimized landing pages.
        </p>

        <h2>What You'll Learn</h2>
        <ul>
          <li>Setting up the development environment</li>
          <li>Understanding the monorepo structure</li>
          <li>Using the component library</li>
          <li>Creating content with MDX</li>
          <li>Deploying your application</li>
        </ul>

        <h2>Prerequisites</h2>
        <p>
          Before you begin, make sure you have the following installed on your system:
        </p>
        <ul>
          <li><strong>Node.js</strong> 18.17 or later</li>
          <li><strong>Bun</strong> 1.0 or later (recommended) or npm/yarn</li>
          <li><strong>Git</strong> for version control</li>
        </ul>

        <h2>Quick Start</h2>
        <p>
          The fastest way to get started is to clone the repository and install dependencies:
        </p>
        
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`# Clone the repository
git clone https://github.com/your-org/lnd-boilerplate.git
cd lnd-boilerplate

# Install dependencies with Bun
bun install

# Start development server
bun run dev`}</code>
        </pre>

        <h2>Project Structure</h2>
        <p>
          LND Boilerplate uses a monorepo structure with the following organization:
        </p>
        
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`lnd-boilerplate/
├── apps/
│   └── landing/          # Main Next.js application
├── packages/
│   ├── ui/              # UI component library
│   └── utils/           # Utility functions
└── docs/                # Documentation`}</code>
        </pre>

        <h2>Component Architecture</h2>
        <p>
          Our component system is organized in three tiers:
        </p>
        
        <h3>1. Primitives</h3>
        <p>
          Basic building blocks like Button, Card, Heading, and Text. These are styled with 
          Tailwind CSS and follow shadcn/ui principles.
        </p>
        
        <h3>2. Compositions</h3>
        <p>
          Complex components assembled from primitives to solve business tasks. Examples include 
          Hero, FeatureGrid, PricingTable, and ProductList.
        </p>
        
        <h3>3. Templates</h3>
        <p>
          High-level page skeletons that define the overall structure. We provide PublicLayout, 
          PageLayout, CollectionLayout, and FullPageLayout.
        </p>

        <h2>Creating Your First Page</h2>
        <p>
          Let's create a simple page using our component library:
        </p>
        
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`import { PublicLayout } from '@lnd/ui/templates'
import { Hero } from '@lnd/ui/components/marketing'

export default function MyPage() {
  return (
    <PublicLayout>
      <Hero
        title="Welcome to My Site"
        subtitle="Built with LND Boilerplate"
        description="This is my amazing landing page."
        ctaButtons={[
          { text: 'Get Started', variant: 'default' }
        ]}
      />
    </PublicLayout>
  )
}`}</code>
        </pre>

        <h2>Content Management with MDX</h2>
        <p>
          LND Boilerplate supports MDX for content management, allowing you to write content 
          in Markdown with embedded React components. Each MDX file can include frontmatter 
          for metadata:
        </p>
        
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`---
title: My Blog Post
description: This is a description of my post
date: 2025-01-25
author: John Doe
tags: [blog, tutorial]
category: Tutorials
---

# My Blog Post

This is the content of my blog post written in **Markdown**.

<CustomComponent prop="value" />
`}</code>
        </pre>

        <h2>SEO Optimization</h2>
        <p>
          Built-in SEO utilities help you create optimized content:
        </p>
        
        <ul>
          <li>Automatic meta tag generation</li>
          <li>Open Graph and Twitter Card support</li>
          <li>Structured data (JSON-LD)</li>
          <li>Sitemap generation</li>
          <li>Robots.txt creation</li>
        </ul>

        <h2>Next Steps</h2>
        <p>
          Now that you have a basic understanding, here are some next steps:
        </p>
        
        <ul>
          <li>Explore the component library in <code>packages/ui</code></li>
          <li>Check out utility functions in <code>packages/utils</code></li>
          <li>Customize the design system in <code>styles/globals.css</code></li>
          <li>Add your own MDX content</li>
          <li>Deploy to your preferred hosting platform</li>
        </ul>

        <h2>Getting Help</h2>
        <p>
          If you run into any issues or have questions:
        </p>
        
        <ul>
          <li>Check the documentation in the <code>docs/</code> folder</li>
          <li>Review the example pages in <code>apps/landing/app/</code></li>
          <li>Open an issue on GitHub</li>
          <li>Join our community discussions</li>
        </ul>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Pro Tip:</strong> Use the development server's hot reload feature to see 
                your changes instantly. The server is already running at <code>http://localhost:3000</code>.
              </p>
            </div>
          </div>
        </div>

        <p>
          Congratulations! You're now ready to start building amazing landing pages with 
          LND Boilerplate. Happy coding! 🚀
        </p>
      </div>
    </PageLayout>
  )
}
