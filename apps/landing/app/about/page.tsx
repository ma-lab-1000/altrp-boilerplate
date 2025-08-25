import { PublicLayout } from '@lnd/ui/templates/PublicLayout'
import { generateMetadata } from '@lnd/utils/seo/metadata'
import { Hero } from '@lnd/ui/components/marketing'
import { FeatureGrid } from '@lnd/ui/components/marketing'
import type { Viewport } from 'next'

// Generate SEO metadata for the about page
export const metadata = generateMetadata({
  title: 'About LND Boilerplate - Our Mission and Vision',
  description: 'Learn about LND Boilerplate, our mission to simplify landing page development, and the team behind this powerful platform.',
  keywords: ['about', 'mission', 'vision', 'team', 'LND Boilerplate', 'landing pages'],
  type: 'website',
  url: 'https://lnd-boilerplate.com/about'
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

export default function AboutPage() {
  const teamMembers = [
    {
      title: 'Open Source',
      text: 'Built with the community, for the community. We believe in transparency and collaboration.'
    },
    {
      title: 'Performance First',
      text: 'Every component and utility is optimized for speed, ensuring your landing pages load lightning fast.'
    },
    {
      title: 'Developer Experience',
      text: 'We prioritize developer happiness with intuitive APIs, comprehensive documentation, and modern tooling.'
    },
    {
      title: 'Accessibility',
      text: 'Built-in accessibility features ensure your landing pages work for everyone, regardless of ability.'
    }
  ]

  const values = [
    {
      title: 'Innovation',
      text: 'We constantly explore new technologies and patterns to stay ahead of the curve.'
    },
    {
      title: 'Quality',
      text: 'Every line of code is written with care, tested thoroughly, and documented comprehensively.'
    },
    {
      title: 'Community',
      text: 'We foster an inclusive community where developers can learn, share, and grow together.'
    },
    {
      title: 'Sustainability',
      text: 'We build for the long term, ensuring our platform evolves with the web ecosystem.'
    }
  ]

  return (
    <PublicLayout>
      <Hero
        title="About LND Boilerplate"
        subtitle="Building the Future of Landing Pages"
        description="We're on a mission to democratize landing page development by providing developers with powerful, flexible, and easy-to-use tools that accelerate their workflow."
        ctaButtons={[
          { text: 'Get Started', variant: 'default' },
          { text: 'View Documentation', variant: 'outline' }
        ]}
        image={{
          src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
          alt: 'Team collaboration and development'
        }}
      />

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To empower developers to create exceptional landing pages faster than ever before, 
              without compromising on quality, performance, or user experience.
            </p>
          </div>

          <FeatureGrid
            title="What Drives Us"
            description="Our core principles guide everything we build"
            features={teamMembers}
            columns={2}
          />
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental beliefs shape our approach to development and community building.
            </p>
          </div>

          <FeatureGrid
            title="Core Values"
            description="The principles that guide our decisions"
            features={values}
            columns={2}
          />
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Story Behind LND Boilerplate
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How a simple need evolved into a comprehensive platform for landing page development.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <p>
                LND Boilerplate was born from a simple frustration: the time it took to set up 
                a new landing page project. Every time we started a new client project, we found 
                ourselves repeating the same setup steps, configuring the same tools, and building 
                the same foundational components.
              </p>
              
              <p>
                Instead of continuing to reinvent the wheel, we decided to build a comprehensive 
                solution that would eliminate this repetitive work. We wanted to create something 
                that would not only speed up development but also ensure consistency, quality, 
                and best practices across all projects.
              </p>
              
              <p>
                What started as an internal tool quickly grew into something we realized could 
                benefit the entire developer community. We open-sourced the project and began 
                building a community around it, incorporating feedback and contributions from 
                developers around the world.
              </p>
              
              <p>
                Today, LND Boilerplate is used by thousands of developers to create landing 
                pages for startups, agencies, and enterprises. We're proud of what we've built 
                and excited about the future we're helping to create.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of the future of landing page development. Contribute, learn, and grow with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn</h3>
              <p className="text-gray-600">
                Access comprehensive documentation, tutorials, and examples to master the platform.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Contribute</h3>
              <p className="text-gray-600">
                Share your ideas, report bugs, or submit pull requests to help improve the platform.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Share</h3>
              <p className="text-gray-600">
                Help others discover LND Boilerplate and build amazing landing pages together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
