import { ContentLayout } from '@lnd/ui/templates'
import { generateMetadata } from '@lnd/utils/seo/metadata'
import type { Viewport } from 'next'

// Generate SEO metadata for the content demo page
export const metadata = generateMetadata({
  title: 'Content-Driven Page Demo - LND Boilerplate',
  description: 'Demonstration of content-driven page architecture using ContentLayout template.',
  keywords: ['content-driven', 'SEO', 'static content', 'LND Boilerplate'],
  type: 'website',
  url: 'https://lnd-boilerplate.com/content-demo'
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

/**
 * Content-Driven Page Demo
 * 
 * This page demonstrates the ContentLayout template, which is optimized for:
 * - Static content and documentation
 * - SEO optimization
 * - Fast loading with minimal JavaScript
 * - Content-first approach
 */
export default function ContentDemoPage() {
  return (
    <ContentLayout 
      title="Content-Driven Page Architecture"
      description="Demonstration of how content-driven pages work with optimized layouts for static content, SEO, and performance."
    >
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg">
          <h2>What is Content-Driven Architecture?</h2>
          <p>
            Content-driven pages are designed for static content that prioritizes SEO, 
            fast loading, and excellent user experience. These pages are perfect for:
          </p>
          
          <ul>
            <li>Blog posts and articles</li>
            <li>Documentation and guides</li>
            <li>Marketing and landing pages</li>
            <li>Static content pages</li>
            <li>SEO-critical pages</li>
          </ul>

          <h2>Key Benefits</h2>
          
          <h3>🚀 Performance</h3>
          <p>
            Content-driven pages load incredibly fast because they use minimal JavaScript 
            and are optimized for static generation. This results in:
          </p>
          <ul>
            <li>Faster First Contentful Paint (FCP)</li>
            <li>Better Core Web Vitals scores</li>
            <li>Improved user experience</li>
            <li>Lower bounce rates</li>
          </ul>

          <h3>🔍 SEO Optimization</h3>
          <p>
            These pages are built with SEO in mind, featuring:
          </p>
          <ul>
            <li>Semantic HTML structure</li>
            <li>Optimized meta tags and descriptions</li>
            <li>Structured data support</li>
            <li>Fast loading times (Google ranking factor)</li>
          </ul>

          <h3>📱 Accessibility</h3>
          <p>
            Content-driven pages follow accessibility best practices:
          </p>
          <ul>
            <li>Proper heading hierarchy</li>
            <li>Semantic HTML elements</li>
            <li>Keyboard navigation support</li>
            <li>Screen reader compatibility</li>
          </ul>

          <h2>Technical Implementation</h2>
          <p>
            The ContentLayout template provides:
          </p>
          
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{`import { ContentLayout } from '@lnd/ui/templates'

export default function MyContentPage() {
  return (
    <ContentLayout 
      title="Page Title"
      description="Page description for SEO"
    >
      <div className="prose prose-lg">
        <h2>Your Content Here</h2>
        <p>Your content goes here...</p>
      </div>
    </ContentLayout>
  )
}`}</code>
          </pre>

          <h2>When to Use Content-Driven Pages</h2>
          <p>
            Choose content-driven architecture when your page:
          </p>
          <ul>
            <li>Contains primarily static content</li>
            <li>Needs excellent SEO performance</li>
            <li>Requires fast loading times</li>
            <li>Has minimal interactivity</li>
            <li>Is part of a content marketing strategy</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Pro Tip:</strong> Content-driven pages work best with Next.js 
                  static generation (getStaticProps) for maximum performance and SEO benefits.
                </p>
              </div>
            </div>
          </div>

          <h2>Next Steps</h2>
          <p>
            Ready to build content-driven pages? Check out the 
            <a href="/application-demo" className="text-blue-600 hover:text-blue-800">
              Application-Driven Page Demo
            </a> to see the difference, or explore our 
            <a href="/blog" className="text-blue-600 hover:text-blue-800">
              blog section
            </a> for more examples.
          </p>
        </div>
      </div>
    </ContentLayout>
  )
}
