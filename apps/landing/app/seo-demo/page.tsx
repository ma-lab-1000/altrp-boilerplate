'use client'

import { useState } from 'react'
import { CollectionLayout } from '@lnd/ui/templates/CollectionLayout'
import { generateMetadata, generateMetaTags, generateStructuredDataScript } from '@lnd/utils/seo/metadata'
import { generateSitemapFromContent, generateRobotsTxt } from '@lnd/utils/seo/sitemap'
import { validateMetadata } from '@lnd/utils/seo/metadata'

export default function SEODemoPage() {
  const [seoData, setSeoData] = useState({
    title: 'My Amazing Blog Post',
    description: 'This is a comprehensive guide about web development and modern technologies.',
    keywords: ['web development', 'JavaScript', 'React', 'Next.js'],
    author: 'John Doe',
    image: 'https://example.com/image.jpg',
    url: 'https://mysite.com/blog/post',
    type: 'article' as const,
    publishedTime: '2025-01-25T10:00:00Z',
    modifiedTime: '2025-01-25T15:30:00Z',
    section: 'Technology',
    tags: ['tutorial', 'guide', 'development']
  })

  const [siteConfig] = useState({
    siteName: 'My Awesome Site',
    siteUrl: 'https://mysite.com',
    defaultLocale: 'en_US'
  })

  // Generate metadata
  const metadata = generateMetadata(seoData, siteConfig)
  const metaTags = generateMetaTags(metadata)
  const structuredData = metadata.structuredData
  const structuredDataScript = generateStructuredDataScript(structuredData)

  // Generate sitemap
  const content = [
    {
      slug: 'my-post',
      lastmod: '2025-01-25',
      changefreq: 'weekly' as const,
      priority: 0.8
    },
    {
      slug: 'another-post',
      lastmod: '2025-01-24',
      changefreq: 'monthly' as const,
      priority: 0.6
    }
  ]

  const sitemap = generateSitemapFromContent(content, {
    siteUrl: siteConfig.siteUrl,
    basePath: '/blog',
    includeImages: true
  })

  // Generate robots.txt
  const robots = generateRobotsTxt({
    userAgents: [
      {
        agent: '*',
        rules: [
          { type: 'allow', path: '/' },
          { type: 'disallow', path: '/admin' },
          { type: 'disallow', path: '/private' }
        ]
      }
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`
  })

  // Validate metadata
  const validation = validateMetadata(seoData)

  return (
    <CollectionLayout
      title="SEO Utilities Demo"
      description="Demonstrating the SEO utilities with metadata generation, sitemap creation, and validation."
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Metadata Generation */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Metadata Generation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Input Data</h4>
              <textarea
                value={JSON.stringify(seoData, null, 2)}
                onChange={(e) => {
                  try {
                    setSeoData(JSON.parse(e.target.value))
                  } catch {}
                }}
                className="w-full h-64 p-3 border rounded-md font-mono text-sm"
                placeholder="Enter SEO data in JSON format"
              />
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Generated Metadata</h4>
              <pre className="w-full h-64 p-3 bg-gray-100 rounded-md overflow-auto text-sm">
                {JSON.stringify(metadata, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Meta Tags */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Generated Meta Tags</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="text-sm overflow-auto">{metaTags}</pre>
          </div>
        </div>

        {/* Structured Data */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Structured Data (JSON-LD)</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="text-sm overflow-auto">{structuredDataScript}</pre>
          </div>
        </div>

        {/* Sitemap Generation */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Sitemap Generation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Content Data</h4>
              <textarea
                value={JSON.stringify(content, null, 2)}
                onChange={(e) => {
                  try {
                    JSON.parse(e.target.value)
                    // Update sitemap when content changes
                  } catch {}
                }}
                className="w-full h-48 p-3 border rounded-md font-mono text-sm"
                placeholder="Enter content data in JSON format"
              />
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Generated Sitemap</h4>
              <div className="bg-gray-100 p-3 rounded-md">
                <pre className="text-sm overflow-auto">{sitemap}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Robots.txt */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Robots.txt Generation</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="text-sm overflow-auto">{robots}</pre>
          </div>
        </div>

        {/* Validation Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Metadata Validation</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-3 ${validation.isValid ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="font-medium">
                Status: {validation.isValid ? 'Valid' : 'Invalid'}
              </span>
            </div>
            
            {validation.errors.length > 0 && (
              <div>
                <h5 className="font-medium text-red-600 mb-2">Errors:</h5>
                <ul className="list-disc list-inside text-red-600 space-y-1">
                  {validation.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {validation.warnings.length > 0 && (
              <div>
                <h5 className="font-medium text-yellow-600 mb-2">Warnings:</h5>
                <ul className="list-disc list-inside text-yellow-600 space-y-1">
                  {validation.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {validation.isValid && validation.warnings.length === 0 && (
              <div className="text-green-600 font-medium">
                ✅ All metadata is valid and optimized!
              </div>
            )}
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">How to Use</h3>
          <div className="text-blue-700 space-y-2">
            <p>• <strong>Metadata Generation:</strong> Fill in the input data to generate complete SEO metadata</p>
            <p>• <strong>Meta Tags:</strong> Copy the generated HTML meta tags to your page head</p>
            <p>• <strong>Structured Data:</strong> Include the JSON-LD script in your page for rich snippets</p>
            <p>• <strong>Sitemap:</strong> Use the generated sitemap.xml for search engine indexing</p>
            <p>• <strong>Robots.txt:</strong> Place the generated robots.txt in your public directory</p>
            <p>• <strong>Validation:</strong> Check for errors and warnings to optimize your SEO</p>
          </div>
        </div>
      </div>
    </CollectionLayout>
  )
}
