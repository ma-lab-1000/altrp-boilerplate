import React from 'react'
import { ContentLayout } from '../ContentLayout'

/**
 * Example: ContentLayout for blog posts and documentation
 * 
 * This example demonstrates how to use ContentLayout for
 * content-driven pages like blog posts, articles, and documentation.
 */
export const ContentLayoutExample: React.FC = () => {
  return (
    <ContentLayout 
      title="Getting Started with LND Boilerplate"
      description="Learn how to set up and use the LND Boilerplate for your next landing page project."
    >
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg">
          <h2>Introduction</h2>
          <p>
            LND Boilerplate is a comprehensive solution for building modern landing pages 
            with Next.js, TypeScript, and Tailwind CSS. This guide will walk you through 
            the setup process and show you how to get started quickly.
          </p>
          
          <h2>Prerequisites</h2>
          <p>Before you begin, make sure you have the following installed:</p>
          <ul>
            <li>Node.js 18+ and npm/yarn/pnpm</li>
            <li>Git for version control</li>
            <li>A code editor (VS Code recommended)</li>
          </ul>
          
          <h2>Installation</h2>
          <p>Clone the repository and install dependencies:</p>
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code>
{`git clone https://github.com/your-org/lnd-boilerplate.git
cd lnd-boilerplate
npm install`}
            </code>
          </pre>
          
          <h2>Configuration</h2>
          <p>
            Copy the sample configuration file and customize it for your project:
          </p>
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code>
{`cp config.sample.json config.json
# Edit config.json with your settings`}
            </code>
          </pre>
          
          <h2>Development</h2>
          <p>Start the development server:</p>
          <pre className="bg-gray-100 p-4 rounded-lg">
            <code>npm run dev</code>
          </pre>
          
          <p>
            Your application will be available at <code>http://localhost:3000</code>.
          </p>
          
          <h2>Next Steps</h2>
          <p>
            Now that you have the basic setup running, you can:
          </p>
          <ul>
            <li>Customize the design and branding</li>
            <li>Add your own content and pages</li>
            <li>Deploy to your preferred hosting platform</li>
            <li>Explore the component library</li>
          </ul>
        </div>
      </div>
    </ContentLayout>
  )
}
