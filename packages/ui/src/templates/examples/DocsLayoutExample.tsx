'use client'

import React from 'react'
import { DocsLayout } from '../DocsLayout'

/**
 * Example: DocsLayout for documentation pages
 * 
 * This example demonstrates how to use DocsLayout for
 * documentation pages with configurable features.
 */
export const DocsLayoutExample: React.FC = () => {
  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'getting-started', title: 'Getting Started', level: 1 },
    { id: 'installation', title: 'Installation', level: 2 },
    { id: 'configuration', title: 'Configuration', level: 2 },
    { id: 'api-reference', title: 'API Reference', level: 1 },
    { id: 'components', title: 'Components', level: 2 },
    { id: 'hooks', title: 'Hooks', level: 2 },
    { id: 'examples', title: 'Examples', level: 1 },
    { id: 'best-practices', title: 'Best Practices', level: 2 },
    { id: 'troubleshooting', title: 'Troubleshooting', level: 2 }
  ]

  return (
    <DocsLayout 
      title="Documentation Template Guide"
      description="Learn how to use the DocsLayout template for creating comprehensive documentation pages."
      tableOfContents={tableOfContents}
    >
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg">
          <h2 id="introduction">Introduction</h2>
          <p>
            The DocsLayout template is specifically designed for documentation pages, 
            providing a comprehensive set of features that can be configured through 
            the site.config.json file. This template offers:
          </p>
          
          <ul>
            <li>Configurable navigation sidebar</li>
            <li>Built-in search functionality</li>
            <li>Breadcrumb navigation</li>
            <li>Reading progress indicator</li>
            <li>Table of contents</li>
            <li>Mobile-responsive design</li>
          </ul>

          <h2 id="getting-started">Getting Started</h2>
          <p>
            To use the DocsLayout template, you need to configure it in your 
            site.config.json file. The template will automatically load these 
            settings and apply them to your documentation pages.
          </p>

          <h3 id="installation">Installation</h3>
          <p>
            First, make sure you have the DocsLayout template available in your project:
          </p>
          
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code>
{`import { DocsLayout } from '@lnd/ui/templates'

export default function DocumentationPage() {
  return (
    <DocsLayout 
      title="Page Title"
      description="Page description"
      tableOfContents={toc}
    >
      <div className="prose prose-lg">
        <h2>Your content here...</h2>
        <p>Your documentation content goes here...</p>
      </div>
    </DocsLayout>
  )
}`}
            </code>
          </pre>

          <h3 id="configuration">Configuration</h3>
          <p>
            Configure the DocsLayout features in your site.config.json file:
          </p>
          
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code>
{`{
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

          <h2 id="api-reference">API Reference</h2>
          <p>
            The DocsLayout component accepts the following props:
          </p>

          <h3 id="components">Components</h3>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>DocsLayout Props:</strong>
                </p>
                <ul className="text-sm text-blue-700 mt-2">
                  <li><code>children</code> - Page content</li>
                  <li><code>title</code> - Page title (optional)</li>
                  <li><code>description</code> - Page description (optional)</li>
                  <li><code>className</code> - Additional CSS classes (optional)</li>
                  <li><code>showHeader</code> - Whether to show the page header (optional)</li>
                  <li><code>tableOfContents</code> - Array of TOC items (optional)</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 id="hooks">Hooks</h3>
          <p>
            The DocsLayout uses several React hooks internally:
          </p>
          <ul>
            <li><code>useState</code> - For managing component state</li>
            <li><code>useEffect</code> - For loading configuration and setting up event listeners</li>
          </ul>

          <h2 id="examples">Examples</h2>
          <p>
            Here are some common use cases for the DocsLayout template:
          </p>

          <h3 id="best-practices">Best Practices</h3>
          <ul>
            <li>Always provide a meaningful title and description</li>
            <li>Use the tableOfContents prop for better navigation</li>
            <li>Configure search functionality for large documentation sets</li>
            <li>Test the mobile responsiveness of your documentation</li>
            <li>Use semantic HTML structure for better accessibility</li>
          </ul>

          <h3 id="troubleshooting">Troubleshooting</h3>
          <p>
            If you encounter issues with the DocsLayout template:
          </p>
          <ul>
            <li>Check that your site.config.json file is properly formatted</li>
            <li>Ensure the documentation feature is enabled in the configuration</li>
            <li>Verify that all required dependencies are installed</li>
            <li>Check the browser console for any JavaScript errors</li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  <strong>Pro Tip:</strong> The DocsLayout template automatically 
                  handles mobile responsiveness and provides a great user experience 
                  across all devices. Make sure to test your documentation on 
                  different screen sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  )
}
