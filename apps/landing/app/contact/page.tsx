import { PublicLayout } from '@lnd/ui/templates/PublicLayout'
import { generateMetadata } from '@lnd/utils/seo/metadata'
import { Hero } from '@lnd/ui/components/marketing'
import { Card, CardContent, CardHeader, CardTitle } from '@lnd/ui/primitives/Card'
import { Button } from '@lnd/ui/primitives/Button'
import { Text } from '@lnd/ui/primitives/Text'
import type { Viewport } from 'next'

// Generate SEO metadata for the contact page
export const metadata = generateMetadata({
  title: 'Contact LND Boilerplate - Get in Touch',
  description: 'Have questions about LND Boilerplate? Need help with implementation? Get in touch with our team for support and guidance.',
  keywords: ['contact', 'support', 'help', 'LND Boilerplate', 'landing pages', 'contact us'],
  type: 'website',
  url: 'https://lnd-boilerplate.com/contact'
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

export default function ContactPage() {
  const contactMethods = [
    {
      title: 'GitHub Issues',
      description: 'Report bugs, request features, or ask questions through our GitHub repository.',
      action: 'Open Issue',
      href: 'https://github.com/your-org/lnd-boilerplate/issues',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      title: 'Discord Community',
      description: 'Join our Discord server to connect with other developers and get real-time help.',
      action: 'Join Discord',
      href: 'https://discord.gg/lnd-boilerplate',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
        </svg>
      )
    },
    {
      title: 'Email Support',
      description: 'Send us an email for detailed questions or business inquiries.',
      action: 'Send Email',
      href: 'mailto:support@lnd-boilerplate.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  const faqs = [
    {
      question: 'How do I get started with LND Boilerplate?',
      answer: 'Clone the repository, install dependencies with `bun install`, and run `bun run dev` to start the development server. Check out our getting started guide for detailed instructions.'
    },
    {
      question: 'Can I use LND Boilerplate for commercial projects?',
      answer: 'Yes! LND Boilerplate is open source and free to use for both personal and commercial projects. We only ask that you give us credit when appropriate.'
    },
    {
      question: 'How do I contribute to the project?',
      answer: 'We welcome contributions! Fork the repository, create a feature branch, make your changes, and submit a pull request. Check our contributing guidelines for more details.'
    },
    {
      question: 'Is there documentation available?',
      answer: 'Yes, we have comprehensive documentation including API references, component examples, and tutorials. You can find it in the docs folder and on our website.'
    },
    {
      question: 'How do I report a bug or request a feature?',
      answer: 'The best way is to open an issue on our GitHub repository. Please provide as much detail as possible, including steps to reproduce for bugs.'
    },
    {
      question: 'Do you provide support for enterprise users?',
      answer: 'We offer community support for all users. For enterprise-specific needs, please contact us directly to discuss custom solutions and support options.'
    }
  ]

  return (
    <PublicLayout>
      <Hero
        title="Get in Touch"
        subtitle="We&apos;re Here to Help"
        description="Have questions about LND Boilerplate? Need help with implementation? Want to contribute? We'd love to hear from you."
        ctaButtons={[
          { text: 'View Documentation', variant: 'default' },
          { text: 'GitHub Repository', variant: 'outline' }
        ]}
        image={{
          src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
          alt: 'Customer support and communication'
        }}
      />

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Methods
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the best way to reach us based on your needs. We&apos;re here to help you succeed with LND Boilerplate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {method.icon}
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Text className="text-gray-600 mb-6">
                    {method.description}
                  </Text>
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                  >
                    {method.action}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about LND Boilerplate. Can&apos;t find what you&apos;re looking for? Get in touch!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text className="text-gray-600">
                      {faq.answer}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with other developers, share your projects, and stay updated with the latest features and improvements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">GitHub Community</CardTitle>
              </CardHeader>
              <CardContent>
                <Text className="text-gray-600 mb-4">
                  Star our repository, watch for updates, and contribute to the project. Join thousands of developers building amazing landing pages.
                </Text>
                <a
                  href="https://github.com/your-org/lnd-boilerplate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                >
                  Visit GitHub
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Discord Server</CardTitle>
              </CardHeader>
              <CardContent>
                <Text className="text-gray-600 mb-4">
                  Chat with other developers in real-time, get help with issues, and share your experiences with LND Boilerplate.
                </Text>
                <a
                  href="https://discord.gg/lnd-boilerplate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                >
                  Join Discord
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start building amazing landing pages with LND Boilerplate today. Our comprehensive platform and supportive community are here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg">
              Get Started Now
            </Button>
            <Button variant="outline" size="lg">
              View Examples
            </Button>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
