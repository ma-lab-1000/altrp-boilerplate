import { DocsLayout } from '@lnd/ui/templates'
import { SiteConfigProvider } from '@lnd/ui/providers/SiteConfigProvider'
import { getDocsPage, getDocsMeta, docsMetaToNavigation } from '@lnd/utils/content'
import { generateMetadata as generateSEOMetadata } from '@lnd/utils/seo/metadata'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Viewport } from 'next'
import { notFound } from 'next/navigation'

interface DocsPageProps {
  params: {
    slug: string[]
  }
}

// Generate static params for all docs pages
export async function generateStaticParams() {
  const { getDocsPages } = await import('@lnd/utils/content')
  const pages = await getDocsPages()
  
  return pages.map((page) => ({
    slug: page.slug.split('/')
  }))
}

// Generate SEO metadata for the docs page
export async function generateMetadata({ params }: DocsPageProps) {
  const slug = params.slug.join('/')
  const page = await getDocsPage(slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested documentation page could not be found.'
    }
  }

  return generateSEOMetadata({
    title: `${page.frontmatter.title} - LND Boilerplate Docs`,
    description: page.frontmatter.description,
    keywords: ['documentation', 'guide', 'tutorial'],
    type: 'article',
    url: `https://lnd-boilerplate.com/docs/${slug}`
  }, {
    siteName: 'LND Boilerplate',
    siteUrl: 'https://lnd-boilerplate.com'
  })
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function DocsPage({ params }: DocsPageProps) {
  const slug = params.slug.join('/')
  const page = await getDocsPage(slug)
  
  if (!page) {
    notFound()
  }

  const meta = await getDocsMeta()
  const navigationItems = docsMetaToNavigation(meta)
  
  // Generate table of contents from content
  const toc = page.content
    .split('\n')
    .filter(line => line.startsWith('#'))
    .map(line => {
      const level = line.match(/^#+/)![0].length
      const title = line.replace(/^#+\s*/, '')
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      
      return { id, title, level }
    })

  return (
    <SiteConfigProvider>
      <DocsLayout
        title={page.frontmatter.title}
        description={page.frontmatter.description}
        tableOfContents={toc}
        navigationItems={navigationItems}
      >
        <div className="prose prose-lg max-w-none">
          <MDXRemote 
            source={page.content}
            components={{
              h1: ({ children, ...props }) => {
                const id = children?.toString().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
                return <h1 id={id} {...props}>{children}</h1>
              },
              h2: ({ children, ...props }) => {
                const id = children?.toString().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
                return <h2 id={id} {...props}>{children}</h2>
              },
              h3: ({ children, ...props }) => {
                const id = children?.toString().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
                return <h3 id={id} {...props}>{children}</h3>
              },
              h4: ({ children, ...props }) => {
                const id = children?.toString().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
                return <h4 id={id} {...props}>{children}</h4>
              },
              h5: ({ children, ...props }) => {
                const id = children?.toString().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
                return <h5 id={id} {...props}>{children}</h5>
              },
              h6: ({ children, ...props }) => {
                const id = children?.toString().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
                return <h6 id={id} {...props}>{children}</h6>
              }
            }}
          />
        </div>
      </DocsLayout>
    </SiteConfigProvider>
  )
}
