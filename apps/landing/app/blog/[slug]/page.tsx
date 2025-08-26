import { PageLayout } from '@lnd/ui/templates'
import { getBlogPost, getExpert } from '@lnd/utils/content'
import { generateMetadata as generateSEOMetadata } from '@lnd/utils/seo/metadata'
import { normalizeFrontmatter } from '@lnd/utils/content/frontmatter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Viewport } from 'next'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate SEO metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return generateSEOMetadata({
    title: `${post.frontmatter.title} - LND Boilerplate Blog`,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags || [],
    type: 'article',
    url: `https://lnd-boilerplate.com/blog/${params.slug}`,
    publishedTime: post.frontmatter.date,
    author: post.frontmatter.authorId,
    section: post.frontmatter.category,
    tags: post.frontmatter.tags
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const author = post.frontmatter.authorId ? await getExpert(post.frontmatter.authorId) : null
  const frontmatter = normalizeFrontmatter({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    author: author?.name || post.frontmatter.authorId,
    authorId: post.frontmatter.authorId,
    tags: post.frontmatter.tags,
    category: post.frontmatter.category,
    image: post.frontmatter.coverImage || post.frontmatter.image,
    coverImage: post.frontmatter.coverImage || post.frontmatter.image,
    draft: post.frontmatter.draft,
    featured: post.frontmatter.featured
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
        <MDXRemote source={post.content} />
      </div>
    </PageLayout>
  )
}
