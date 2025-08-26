# Layout Templates Architecture

## Overview

This package provides a comprehensive set of layout templates designed to support both **Content-Driven** and **Application-Driven** page architectures in Next.js applications.

## Architecture Principles

### Content-Driven Pages
- **Purpose**: Static content, SEO-optimized, fast loading
- **Use Cases**: Blog posts, documentation, marketing pages, landing pages
- **Characteristics**: Minimal JavaScript, server-side rendering, content-first approach

### Application-Driven Pages  
- **Purpose**: Dynamic functionality, interactivity, state management
- **Use Cases**: Dashboards, forms, interactive components, data-driven interfaces
- **Characteristics**: Client-side interactivity, dynamic content loading, state management

## Available Templates

### 1. PublicLayout
**Base template for all public pages**
- Provides common structure (header, footer)
- Used as foundation for other layouts
- Minimal styling, maximum flexibility

### 2. ContentLayout
**Optimized for content-driven pages**
```tsx
import { ContentLayout } from '@lnd/ui/templates'

export default function BlogPost() {
  return (
    <ContentLayout 
      title="My Blog Post"
      description="A great article about web development"
    >
      <p>Your content here...</p>
    </ContentLayout>
  )
}
```

**Features:**
- SEO-optimized structure
- Prose styling for readable content
- Fast loading with minimal JavaScript
- Static generation friendly

### 3. ApplicationLayout
**Optimized for application-driven pages**
```tsx
import { ApplicationLayout } from '@lnd/ui/templates'

export default function Dashboard() {
  return (
    <ApplicationLayout 
      title="Dashboard"
      description="Manage your account and settings"
    >
      <InteractiveComponent />
    </ApplicationLayout>
  )
}
```

**Features:**
- Client-side interactivity support
- State management ready
- Dynamic content loading
- Interactive component support

### 4. CollectionLayout
**For listing and collection pages**
```tsx
import { CollectionLayout } from '@lnd/ui/templates'

export default function BlogList() {
  return (
    <CollectionLayout 
      title="Blog Posts"
      description="Latest articles and tutorials"
    >
      <BlogPostList />
    </CollectionLayout>
  )
}
```

### 5. DocsLayout
**Optimized for documentation pages**
```tsx
import { DocsLayout } from '@lnd/ui/templates'

export default function DocumentationPage() {
  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'getting-started', title: 'Getting Started', level: 2 }
  ]

  return (
    <DocsLayout 
      title="API Documentation"
      description="Complete API reference guide"
      tableOfContents={tableOfContents}
    >
      <div className="prose prose-lg">
        <h2 id="introduction">Introduction</h2>
        <p>Your documentation content here...</p>
      </div>
    </DocsLayout>
  )
}
```

**Features:**
- Configurable navigation sidebar
- Built-in search functionality
- Breadcrumb navigation
- Reading progress indicator
- Table of contents
- Mobile-responsive design
- All features configurable through site.config.json

## Usage Guidelines

### When to Use ContentLayout
- ✅ Blog posts and articles
- ✅ Documentation pages
- ✅ Marketing and landing pages
- ✅ Static content pages
- ✅ SEO-critical pages

### When to Use ApplicationLayout
- ✅ User dashboards
- ✅ Forms and interactive components
- ✅ Data visualization pages
- ✅ Real-time content
- ✅ Stateful applications

### When to Use CollectionLayout
- ✅ Blog post listings
- ✅ Product catalogs
- ✅ Search results
- ✅ Category pages
- ✅ Archive pages

### When to Use DocsLayout
- ✅ API documentation
- ✅ User guides and tutorials
- ✅ Technical specifications
- ✅ Knowledge bases
- ✅ Developer documentation
- ✅ Help centers

## Migration Guide

### From Generic Layouts to Specialized Layouts

**Before:**
```tsx
// All pages used the same layout
<PublicLayout>
  <div className="container mx-auto px-4 py-8">
    <h1>{title}</h1>
    <div>{content}</div>
  </div>
</PublicLayout>
```

**After:**
```tsx
// Content-driven page
<ContentLayout title={title} description={description}>
  {content}
</ContentLayout>

// Application-driven page  
<ApplicationLayout title={title} description={description}>
  {interactiveContent}
</ApplicationLayout>

// Documentation page
<DocsLayout title={title} description={description} tableOfContents={toc}>
  {documentationContent}
</DocsLayout>
```

## Performance Considerations

### ContentLayout
- Optimized for static generation
- Minimal JavaScript bundle
- Fast First Contentful Paint (FCP)
- SEO-friendly structure

### ApplicationLayout
- Supports code splitting
- Client-side hydration ready
- State management integration
- Interactive component support

### DocsLayout
- Configurable through site.config.json
- Lazy loading of navigation items
- Efficient search indexing
- Mobile-optimized interactions

## Best Practices

1. **Choose the right layout** based on page type and requirements
2. **Use ContentLayout** for static, SEO-critical content
3. **Use ApplicationLayout** for dynamic, interactive features
4. **Use DocsLayout** for comprehensive documentation with navigation
5. **Configure features** through site.config.json for DocsLayout
6. **Keep layouts focused** on their specific use cases
7. **Test performance** with each layout type
8. **Document layout choices** in your project

## Examples

See the `/examples` directory for complete implementation examples of each layout type.
