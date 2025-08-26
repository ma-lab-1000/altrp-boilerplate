# @lnd/utils

Utility functions for the LND Boilerplate platform.

## 🏗️ Architecture

The utils package provides essential functionality for content management, SEO, and search:

### **Content Management**
- **MDX Utilities** - Parse and process MDX content
- **Frontmatter** - Validate and normalize metadata
- **Relationships** - Build content relationship graphs

### **SEO & Metadata**
- **Metadata Generation** - Complete SEO metadata with Open Graph and Twitter Cards
- **Sitemap Generation** - XML sitemaps with image and video support
- **Robots.txt** - Search engine crawling directives

### **Search Functionality**
- **FlexSearch Integration** - Fast client-side search with highlighting
- **Index Management** - Create, export, and import search indexes
- **Search Results** - Ranked results with field-specific scoring

## 🚀 Usage

### Installation

The package is automatically available in the monorepo workspace.

### Content Management

#### MDX Processing

```typescript
import { parseMDX, extractFrontmatter, generateExcerpt } from '@lnd/utils/content'

// Parse MDX content
const { content, data } = parseMDX(mdxSource)

// Extract frontmatter
const frontmatter = extractFrontmatter(mdxSource)

// Generate excerpt
const excerpt = generateExcerpt(content, 160)
```

#### Frontmatter Validation

```typescript
import { validateFrontmatter, normalizeFrontmatter } from '@lnd/utils/content'

// Validate required fields
const validation = validateFrontmatter(data, ['title', 'description'])
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors)
}

// Normalize to consistent format
const normalized = normalizeFrontmatter(data)
```

#### Content Relationships

```typescript
import { buildRelationships, findRelatedContent } from '@lnd/utils/content'

// Build relationship graph
const graph = buildRelationships(contentItems)

// Find related content
const related = findRelatedContent(graph, 'post-id', 5)
```

### SEO & Metadata

#### Generate Complete SEO Metadata

```typescript
import { generateMetadata, generateMetaTags } from '@lnd/utils/seo'

const seoData = {
  title: 'My Blog Post',
  description: 'A comprehensive guide to...',
  author: 'John Doe',
  image: 'https://example.com/image.jpg',
  type: 'article'
}

// Generate complete metadata object
const metadata = generateMetadata(seoData, {
  siteName: 'My Site',
  siteUrl: 'https://mysite.com'
})

// Generate HTML meta tags
const metaTags = generateMetaTags(metadata)
```

#### Sitemap Generation

```typescript
import { generateSitemapFromContent } from '@lnd/utils/seo'

const content = [
  {
    slug: 'my-post',
    lastmod: '2025-01-25',
    changefreq: 'weekly',
    priority: 0.8
  }
]

const sitemap = generateSitemapFromContent(content, {
  siteUrl: 'https://mysite.com',
  basePath: '/blog',
  includeImages: true
})
```

#### Robots.txt

```typescript
import { generateRobotsTxt } from '@lnd/utils/seo'

const robots = generateRobotsTxt({
  userAgents: [
    {
      agent: '*',
      rules: [
        { type: 'allow', path: '/' },
        { type: 'disallow', path: '/admin' }
      ]
    }
  ],
  sitemap: 'https://mysite.com/sitemap.xml'
})
```

### Search Functionality

#### Create Search Index

```typescript
import { createSearchIndex, searchContent } from '@lnd/utils/search'

const documents = [
  {
    id: '1',
    title: 'Getting Started',
    content: 'Learn how to get started...',
    tags: ['tutorial', 'beginner']
  }
]

// Create search index
const index = createSearchIndex(documents)

// Search content
const results = await searchContent(index, documents, 'getting started', {
  limit: 10,
  highlight: true
})
```

#### Search Options

```typescript
const searchOptions = {
  limit: 20,                    // Maximum results
  suggest: true,                // Enable suggestions
  highlight: true,              // Add highlights
  fields: ['title', 'content']  // Search in specific fields
}

const results = await searchContent(index, documents, query, searchOptions)
```

#### Export/Import Index

```typescript
import { exportSearchIndex, importSearchIndex } from '@lnd/utils/search'

// Export for persistence
const exported = exportSearchIndex(index)

// Import from exported data
const importedIndex = importSearchIndex(exported)
```

## 🔧 Configuration

### FlexSearch Options

The search functionality uses FlexSearch with optimized defaults:

```typescript
const flexSearchConfig = {
  tokenize: 'forward',    // Forward tokenization
  resolution: 9,          // High resolution for accuracy
  cache: true            // Enable caching for performance
}
```

### SEO Defaults

SEO utilities have sensible defaults that can be overridden:

```typescript
const seoDefaults = {
  siteName: 'LND Boilerplate',
  siteUrl: 'https://lnd-boilerplate.com',
  defaultLocale: 'en_US',
  includeOpenGraph: true,
  includeTwitter: true,
  includeStructuredData: true
}
```

## 📱 Performance

### Search Performance

- **Fast Indexing**: O(n) time complexity for index creation
- **Efficient Search**: Sub-linear search time with FlexSearch
- **Memory Optimized**: Compact index storage with compression
- **Caching**: Built-in caching for repeated queries

### SEO Performance

- **Static Generation**: Generate metadata at build time
- **Minimal Runtime**: No runtime overhead for SEO
- **Optimized Output**: Clean, minified HTML and XML

## 🧪 Testing

Run the utils package tests:

```bash
bun run --cwd packages/utils test
```

## 📚 Examples

See the main application (`apps/landing`) for complete usage examples of all utilities.

## 🤝 Contributing

1. Follow TypeScript best practices
2. Add comprehensive JSDoc comments
3. Include error handling and validation
4. Write tests for new functionality
5. Update this README with new utilities
6. Ensure backward compatibility

## 📦 Dependencies

- **gray-matter**: MDX frontmatter parsing
- **flexsearch**: Fast client-side search
- **next-sitemap**: Sitemap generation utilities

## 🔗 Related

- **@lnd/ui**: UI component library
- **@lnd/landing**: Main application
