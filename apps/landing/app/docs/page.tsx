import { DocsLayout } from '@lnd/ui/templates'
import { SiteConfigProvider } from '@lnd/ui/providers/SiteConfigProvider'
import { getDocsPages, getDocsMeta, docsMetaToNavigation } from '@lnd/utils/content'
import { generateMetadata } from '@lnd/utils/seo/metadata'
import Link from 'next/link'
import type { Viewport } from 'next'

// Generate SEO metadata for the docs index page
export const metadata = generateMetadata({
  title: 'Documentation - LND Boilerplate',
  description: 'Complete documentation for LND Boilerplate - learn how to build modern web applications.',
  keywords: ['documentation', 'guide', 'tutorial', 'LND Boilerplate'],
  type: 'website',
  url: 'https://lnd-boilerplate.com/docs'
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

export default async function DocsIndexPage() {
  const docsPages = await getDocsPages()
  const meta = await getDocsMeta()
  const navigationItems = docsMetaToNavigation(meta)
  
  // Group pages by section
  const sections: Record<string, MDXFile[]> = {}
  const rootPages: MDXFile[] = []
  
  docsPages.forEach(page => {
    if (page.slug.includes('/')) {
      const [section] = page.slug.split('/')
      if (!sections[section]) {
        sections[section] = []
      }
      sections[section].push(page)
    } else {
      rootPages.push(page)
    }
  })
  
  return (
    <SiteConfigProvider>
      <DocsLayout
        title="Documentation"
        description="Complete documentation for LND Boilerplate"
        tableOfContents={[]}
        navigationItems={navigationItems}
      >
        <div className="prose prose-lg max-w-none">
          <h1>Documentation</h1>
          <p>Welcome to the LND Boilerplate documentation. Here you'll find everything you need to get started and build amazing web applications.</p>
          
          {/* Root level pages */}
          {rootPages.length > 0 && (
            <>
              <h2>Getting Started</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {rootPages.map((page) => (
                  <div key={page.slug} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-2">
                      <Link href={`/docs/${page.slug}`} className="text-blue-600 hover:text-blue-800">
                        {page.frontmatter.title || page.slug}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {page.frontmatter.description || 'No description available'}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Section pages */}
          {Object.entries(sections).map(([sectionName, pages]) => (
            <div key={sectionName}>
              <h2 className="capitalize">{sectionName.replace('-', ' ')}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {pages.map((page) => (
                  <div key={page.slug} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-2">
                      <Link href={`/docs/${page.slug}`} className="text-blue-600 hover:text-blue-800">
                        {page.frontmatter.title || page.slug.split('/').pop()}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {page.frontmatter.description || 'No description available'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DocsLayout>
    </SiteConfigProvider>
  )
}
