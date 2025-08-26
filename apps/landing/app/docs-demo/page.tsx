import { DocsLayout } from '@lnd/ui/templates'
import { SiteConfigProvider } from '@lnd/ui/providers/SiteConfigProvider'
import { generateMetadata } from '@lnd/utils/seo/metadata'
import type { Viewport } from 'next'

// Generate SEO metadata for the docs demo page
export const metadata = generateMetadata({
  title: 'Documentation Template Demo - LND Boilerplate',
  description: 'Demonstration of the DocsLayout template for documentation pages with configurable features.',
  keywords: ['documentation', 'template', 'layout', 'LND Boilerplate', 'docs'],
  type: 'website',
  url: 'https://lnd-boilerplate.com/docs-demo'
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
 * Documentation Template Demo
 * 
 * This page demonstrates the DocsLayout template, which is optimized for:
 * - Documentation pages with navigation
 * - Configurable features through site.config.json
 * - Search functionality
 * - Reading progress tracking
 * - Mobile-responsive design
 */
export default function DocsDemoPage() {
  const tableOfContents = [
    { id: 'overview', title: 'Overview', level: 1 },
    { id: 'features', title: 'Key Features', level: 1 },
    { id: 'navigation', title: 'Navigation System', level: 2 },
    { id: 'search', title: 'Search Functionality', level: 2 },
    { id: 'progress', title: 'Reading Progress', level: 2 },
    { id: 'mobile', title: 'Mobile Experience', level: 2 },
    { id: 'configuration', title: 'Configuration', level: 1 },
    { id: 'setup', title: 'Setup Guide', level: 2 },
    { id: 'customization', title: 'Customization', level: 2 },
    { id: 'best-practices', title: 'Best Practices', level: 1 },
    { id: 'accessibility', title: 'Accessibility', level: 2 },
    { id: 'performance', title: 'Performance', level: 2 },
    { id: 'examples', title: 'Real-world Examples', level: 1 }
  ]

  return (
    <SiteConfigProvider>
      <DocsLayout 
        title="Documentation Template Demo"
        description="Experience the power of the DocsLayout template with configurable navigation, search, and reading progress features."
        tableOfContents={tableOfContents}
      >
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg">
          <h2 id="overview">Overview</h2>
          <p>
            The DocsLayout template is a comprehensive solution for creating 
            documentation pages that provide an excellent user experience. 
            Built with configurability in mind, it allows you to customize 
            every aspect of the documentation experience through the 
            site.config.json configuration file.
          </p>

          <p>
            This template is perfect for:
          </p>
          <ul>
            <li>API documentation</li>
            <li>User guides and tutorials</li>
            <li>Technical specifications</li>
            <li>Knowledge bases</li>
            <li>Developer documentation</li>
          </ul>

          <h2 id="features">Key Features</h2>
          <p>
            The DocsLayout template comes with a rich set of features that 
            can be enabled or disabled based on your needs:
          </p>

          <h3 id="navigation">Navigation System</h3>
          <p>
            The template includes a configurable navigation sidebar that can be 
            positioned on the left or right side of the content. The navigation 
            is fully responsive and includes:
          </p>
          <ul>
            <li>Collapsible menu items</li>
            <li>Active state indicators</li>
            <li>Mobile-friendly hamburger menu</li>
            <li>Keyboard navigation support</li>
          </ul>

          <h3 id="search">Search Functionality</h3>
          <p>
            Built-in search functionality allows users to quickly find content 
            within your documentation. The search feature supports:
          </p>
          <ul>
            <li>Local search indexing</li>
            <li>Algolia integration (optional)</li>
            <li>Real-time search suggestions</li>
            <li>Search result highlighting</li>
          </ul>

          <h3 id="progress">Reading Progress</h3>
          <p>
            A visual reading progress indicator helps users understand their 
            position within the document. This feature includes:
          </p>
          <ul>
            <li>Top progress bar</li>
            <li>Smooth scrolling animations</li>
            <li>Percentage-based tracking</li>
            <li>Configurable visibility</li>
          </ul>

          <h3 id="mobile">Mobile Experience</h3>
          <p>
            The template is fully responsive and provides an excellent mobile 
            experience with:
          </p>
          <ul>
            <li>Touch-friendly navigation</li>
            <li>Optimized typography for small screens</li>
            <li>Gesture-based interactions</li>
            <li>Fast loading times</li>
          </ul>

          <h2 id="configuration">Configuration</h2>
          <p>
            All features of the DocsLayout template can be configured through 
            the site.config.json file. This allows you to customize the 
            documentation experience without modifying code.
          </p>

          <h3 id="setup">Setup Guide</h3>
          <p>
            To get started with the DocsLayout template:
          </p>
          <ol>
            <li>Add the documentation configuration to your site.config.json</li>
            <li>Import the DocsLayout component in your page</li>
            <li>Configure the table of contents</li>
            <li>Test the mobile responsiveness</li>
          </ol>

          <pre className="bg-gray-100 p-4 rounded-lg">
            <code>
{`// site.config.json
{
  "features": {
    "documentation": {
      "enabled": true,
      "path": "/docs",
      "navigation": {
        "enabled": true,
        "position": "left",
        "showProgress": true,
        "showBreadcrumbs": true
      },
      "search": {
        "enabled": true,
        "provider": "local",
        "placeholder": "Search documentation..."
      },
      "layout": {
        "sidebar": true,
        "toc": true,
        "footer": true
      }
    }
  }
}`}
            </code>
          </pre>

          <h3 id="customization">Customization</h3>
          <p>
            The template supports extensive customization through:
          </p>
          <ul>
            <li>CSS custom properties for theming</li>
            <li>Configurable component props</li>
            <li>Custom navigation menus</li>
            <li>Branded search interfaces</li>
          </ul>

          <h2 id="best-practices">Best Practices</h2>
          <p>
            To get the most out of the DocsLayout template, follow these 
            best practices:
          </p>

          <h3 id="accessibility">Accessibility</h3>
          <p>
            The template is built with accessibility in mind:
          </p>
          <ul>
            <li>Semantic HTML structure</li>
            <li>ARIA labels and roles</li>
            <li>Keyboard navigation support</li>
            <li>Screen reader compatibility</li>
            <li>High contrast mode support</li>
          </ul>

          <h3 id="performance">Performance</h3>
          <p>
            Optimized for performance with:
          </p>
          <ul>
            <li>Lazy loading of navigation items</li>
            <li>Efficient search indexing</li>
            <li>Minimal JavaScript footprint</li>
            <li>Optimized CSS delivery</li>
          </ul>

          <h2 id="examples">Real-world Examples</h2>
          <p>
            The DocsLayout template is perfect for various types of 
            documentation:
          </p>
          <ul>
            <li><strong>API Documentation:</strong> Comprehensive API references with searchable endpoints</li>
            <li><strong>User Guides:</strong> Step-by-step tutorials with progress tracking</li>
            <li><strong>Technical Specs:</strong> Detailed technical documentation with table of contents</li>
            <li><strong>Knowledge Bases:</strong> Searchable knowledge repositories</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Try it out:</strong> Use the navigation sidebar to explore 
                  different sections, try the search functionality, and notice how 
                  the reading progress indicator updates as you scroll through the content.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  <strong>Mobile Ready:</strong> Try viewing this page on a mobile 
                  device to see how the template adapts to smaller screens with 
                  the collapsible navigation menu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </DocsLayout>
    </SiteConfigProvider>
  )
}
