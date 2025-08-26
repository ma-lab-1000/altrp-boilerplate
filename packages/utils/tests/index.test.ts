import { describe, it, expect } from 'bun:test'

// Import all test modules to ensure they run
import './content/frontmatter.test'
import './content/mdx.test'
import './content/relationships.test'
import './search/simple.test'
import './seo/metadata.test'
import './seo/sitemap.test'
import './seo/robots.test'
import './formatters/index.test'

describe('Utils Package Integration', () => {
  it('should have all test modules loaded', () => {
    expect(true).toBe(true)
  })
})
