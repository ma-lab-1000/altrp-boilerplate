import { PageLayout } from '@lnd/ui/templates/PageLayout'
import type { Viewport } from 'next'
import { generateMetadata } from '@lnd/utils/seo/metadata'
import { normalizeFrontmatter } from '@lnd/utils/content/frontmatter'

// Generate SEO metadata for the blog post
export const metadata = generateMetadata({
  title: 'Building Custom Components with LND Boilerplate',
  description: 'A comprehensive guide to creating and customizing components in the LND UI library. Learn component patterns and best practices.',
  keywords: ['components', 'UI library', 'customization', 'React', 'TypeScript', 'Tailwind CSS'],
  type: 'article',
  url: 'https://lnd-boilerplate.com/blog/custom-components',
  publishedTime: '2025-01-24T10:00:00Z',
  modifiedTime: '2025-01-24T15:30:00Z',
  author: 'LND Team',
  section: 'Development',
  tags: ['components', 'UI library', 'development', 'tutorial']
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

export default function CustomComponentsPage() {
  const frontmatter = normalizeFrontmatter({
    title: 'Building Custom Components',
    description: 'A comprehensive guide to creating and customizing components in the LND UI library.',
    date: '2025-01-24',
    author: 'LND Team',
    authorId: 'lnd-team',
    tags: ['Components', 'UI Library', 'Development'],
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
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
        <h2>Understanding Component Architecture</h2>
        <p>
          The LND Boilerplate follows a three-tier component architecture that promotes 
          reusability, maintainability, and consistency across your application. Understanding 
          this structure is key to building effective custom components.
        </p>

        <h2>Component Tiers</h2>
        
        <h3>1. Primitives (Tier 1)</h3>
        <p>
          Primitives are the atomic building blocks of your UI. They represent the most basic 
          elements and should be highly reusable across different contexts.
        </p>
        
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`// Example: Custom Button primitive
import { cn } from '@lnd/ui/lib'

interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  // ... other props
}

export function CustomButton({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: CustomButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors'
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  }
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8'
  }
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}`}</code>
        </pre>

        <h3>2. Compositions (Tier 2)</h3>
        <p>
          Compositions combine primitives to create more complex, business-specific components. 
          They solve particular use cases and can be reused across similar contexts.
        </p>
        
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`// Example: Custom Feature Card composition
import { Card, CardContent, CardHeader, CardTitle } from '@lnd/ui/primitives/Card'
import { CustomButton } from './CustomButton'

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  ctaText?: string
  onCtaClick?: () => void
}

export function FeatureCard({
  title,
  description,
  icon,
  ctaText,
  onCtaClick
}: FeatureCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        {icon && (
          <div className="w-12 h-12 mb-4 text-primary">
            {icon}
          </div>
        )}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        {ctaText && onCtaClick && (
          <CustomButton
            variant="outline"
            size="sm"
            onClick={onCtaClick}
          >
            {ctaText}
          </CustomButton>
        )}
      </CardContent>
    </Card>
  )
}`}</code>
        </pre>

        <h3>3. Templates (Tier 3)</h3>
        <p>
          Templates define the overall page structure and layout. They combine compositions 
          and primitives to create complete page skeletons.
        </p>
        
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`// Example: Custom Blog Post template
import { PageLayout } from '@lnd/ui/templates/PageLayout'
import { FeatureCard } from './FeatureCard'
import { CustomButton } from './CustomButton'

interface BlogPostTemplateProps {
  title: string
  description: string
  content: React.ReactNode
  relatedPosts?: Array<{
    title: string
    description: string
    href: string
  }>
}

export function BlogPostTemplate({
  title,
  description,
  content,
  relatedPosts = []
}: BlogPostTemplateProps) {
  return (
    <PageLayout
      title={title}
      description={description}
    >
      <div className="max-w-4xl mx-auto">
        {/* Main content */}
        <article className="prose prose-lg max-w-none mb-12">
          {content}
        </article>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post, index) => (
                <FeatureCard
                  key={index}
                  title={post.title}
                  description={post.description}
                  ctaText="Read More"
                  onCtaClick={() => window.location.href = post.href}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  )
}`}</code>
        </pre>

        <h2>Best Practices</h2>
        
        <h3>1. Component Naming</h3>
        <ul>
          <li>Use PascalCase for component names</li>
          <li>Be descriptive and specific</li>
          <li>Follow the established naming conventions</li>
        </ul>
        
        <h3>2. Props Interface</h3>
        <ul>
          <li>Define clear, typed interfaces for all props</li>
          <li>Use optional props with sensible defaults</li>
          <li>Extend HTML element props when appropriate</li>
        </ul>
        
        <h3>3. Styling</h3>
        <ul>
          <li>Use Tailwind CSS utility classes</li>
          <li>Leverage the <code>cn</code> utility for conditional classes</li>
          <li>Follow the design system's spacing and color scales</li>
        </ul>
        
        <h3>4. Accessibility</h3>
        <ul>
          <li>Include proper ARIA attributes</li>
          <li>Ensure keyboard navigation support</li>
          <li>Test with screen readers</li>
        </ul>

        <h2>Creating a Custom Component Library</h2>
        <p>
          To organize your custom components effectively, consider creating a dedicated 
          component library within your project:
        </p>
        
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`// packages/ui/src/components/custom/index.ts
export { CustomButton } from './CustomButton'
export { FeatureCard } from './FeatureCard'
export { BlogPostTemplate } from './BlogPostTemplate'

// Usage in your app
import { CustomButton, FeatureCard } from '@lnd/ui/components/custom'`}</code>
        </pre>

        <h2>Testing Your Components</h2>
        <p>
          Always test your custom components to ensure they work correctly:
        </p>
        
        <ul>
          <li>Test different prop combinations</li>
          <li>Verify responsive behavior</li>
          <li>Check accessibility features</li>
          <li>Test edge cases and error states</li>
        </ul>

        <h2>Example: Complete Custom Component</h2>
        <p>
          Here's a complete example of a custom testimonial component:
        </p>
        
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`import React from 'react'
import { cn } from '@lnd/ui/lib'
import { Card, CardContent } from '@lnd/ui/primitives/Card'
import { Text } from '@lnd/ui/primitives/Text'

interface TestimonialProps {
  quote: string
  author: {
    name: string
    title: string
    company: string
    avatar?: string
  }
  rating?: number
  className?: string
}

export function Testimonial({
  quote,
  author,
  rating = 5,
  className
}: TestimonialProps) {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={cn(
          'w-4 h-4',
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        )}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <Card className={cn('relative', className)}>
      <CardContent className="p-6">
        {/* Quote */}
        <blockquote className="mb-4">
          <Text className="text-lg italic text-gray-700">
            "{quote}"
          </Text>
        </blockquote>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          {renderStars()}
        </div>
        
        {/* Author */}
        <div className="flex items-center">
          {author.avatar && (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-10 h-10 rounded-full mr-3"
            />
          )}
          <div>
            <Text className="font-semibold text-gray-900">
              {author.name}
            </Text>
            <Text className="text-sm text-gray-600">
              {author.title} at {author.company}
            </Text>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}`}</code>
        </pre>

        <h2>Next Steps</h2>
        <p>
          Now that you understand how to create custom components:
        </p>
        
        <ul>
          <li>Start with simple primitives and build up to complex compositions</li>
          <li>Follow the established patterns in the existing component library</li>
          <li>Document your components with clear examples</li>
          <li>Share reusable components with your team</li>
          <li>Consider contributing back to the main component library</li>
        </ul>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 my-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>Success!</strong> You now have the knowledge to create custom components 
                that integrate seamlessly with the LND Boilerplate design system.
              </p>
            </div>
          </div>
        </div>

        <p>
          Remember, the key to building great components is to start simple, iterate quickly, 
          and always consider the user experience. Happy component building! 🎨
        </p>
      </div>
    </PageLayout>
  )
}
