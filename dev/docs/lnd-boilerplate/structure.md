# 📁 Project Structure

```
lnd-boilerplate/
├── 📁 .github/
│   └── 📁 workflows/
│       └── 📄 ci.yml                    # GitHub Actions CI/CD pipeline
├── 📁 apps/
│   └── 📁 landing/                      # Next.js 14 application
│       ├── 📁 app/                       # App Router pages
│       │   ├── 📄 layout.tsx            # Root layout
│       │   ├── 📄 page.tsx              # Home page
│       │   ├── 📁 blog/                 # Blog section
│       │   │   ├── 📄 page.tsx          # Blog index
│       │   │   ├── 📁 getting-started/  # Blog post
│       │   │   └── 📁 custom-components/# Blog post
│       │   ├── 📁 about/                # About page
│       │   ├── 📁 contact/              # Contact page
│       │   ├── 📁 search-demo/          # Search demo page
│       │   └── 📁 seo-demo/             # SEO demo page
│       ├── 📁 public/                    # Static assets
│       │   ├── 📄 manifest.json         # PWA manifest
│       │   ├── 📄 robots.txt            # SEO robots file
│       │   └── 📁 icons/                # PWA icons (placeholder)
│       ├── 📁 styles/                    # Global styles
│       │   └── 📄 globals.css           # Tailwind + custom CSS
│       ├── 📄 next.config.js            # Next.js configuration
│       ├── 📄 tailwind.config.js        # Tailwind configuration
│       ├── 📄 postcss.config.js         # PostCSS configuration
│       ├── 📄 tsconfig.json             # TypeScript configuration
│       └── 📄 package.json              # App dependencies
├── 📁 packages/
│   ├── 📁 ui/                           # UI component library
│   │   ├── 📁 src/
│   │   │   ├── 📁 components/           # Compositions (Tier 2)
│   │   │   │   ├── 📁 marketing/        # Marketing components
│   │   │   │   │   ├── 📄 Hero.tsx      # Hero section
│   │   │   │   │   ├── 📄 FeatureGrid.tsx# Feature grid
│   │   │   │   │   └── 📄 PricingTable.tsx# Pricing table
│   │   │   │   ├── 📁 ecommerce/        # E-commerce components
│   │   │   │   │   ├── 📄 ProductList.tsx# Product list
│   │   │   │   │   └── 📄 ProductCard.tsx# Product card
│   │   │   │   └── 📁 navigation/       # Navigation components
│   │   │   │       ├── 📄 Header.tsx    # Site header
│   │   │   │       └── 📄 Footer.tsx    # Site footer
│   │   │   ├── 📁 primitives/           # Atomic components (Tier 1)
│   │   │   │   ├── 📄 Button.tsx        # Button component
│   │   │   │   ├── 📄 Card.tsx          # Card component
│   │   │   │   ├── 📄 Heading.tsx       # Heading component
│   │   │   │   └── 📄 Text.tsx          # Text component
│   │   │   ├── 📁 templates/            # Page templates (Tier 3)
│   │   │   │   ├── 📄 PublicLayout.tsx  # Public page layout
│   │   │   │   ├── 📄 PageLayout.tsx    # Content page layout
│   │   │   │   ├── 📄 CollectionLayout.tsx# Collection page layout
│   │   │   │   └── 📄 FullPageLayout.tsx# Full page layout
│   │   │   └── 📄 index.ts              # Main exports
│   │   ├── 📄 package.json              # UI package config
│   │   └── 📄 README.md                  # UI package documentation
│   └── 📁 utils/                        # Utility functions
│       ├── 📁 src/
│       │   ├── 📁 content/              # Content management
│       │   │   ├── 📄 mdx.ts            # MDX parsing utilities
│       │   │   ├── 📄 frontmatter.ts    # Frontmatter utilities
│       │   │   └── 📄 relationships.ts  # Content relationships
│       │   ├── 📁 seo/                  # SEO utilities
│       │   │   ├── 📄 metadata.ts       # SEO metadata generation
│       │   │   └── 📄 sitemap.ts        # Sitemap generation
│       │   ├── 📁 search/               # Search utilities
│       │   │   ├── 📄 index.ts          # Search exports
│       │   │   └── 📄 simple.ts         # Simple search implementation
│       │   └── 📄 index.ts              # Main exports
│       ├── 📄 package.json              # Utils package config
│       └── 📄 README.md                  # Utils package documentation
├── 📄 package.json                       # Root package.json (Bun workspaces)
├── 📄 tsconfig.json                      # Global TypeScript configuration
├── 📄 bun.lockb                          # Bun lock file
├── 📄 Makefile                           # Build and deployment scripts
├── 📄 vercel.json                        # Vercel deployment configuration
├── 📄 netlify.toml                       # Netlify deployment configuration
├── 📄 Dockerfile                         # Docker container configuration
├── 📄 .dockerignore                      # Docker ignore file
├── 📄 DEPLOYMENT.md                      # Deployment documentation
├── 📄 TECH_SPEC.md                       # Technical specification
└── 📄 README.md                          # Project overview and setup
```

## 🚀 Deployment Files

### Platform Configurations
- **`vercel.json`** - Vercel deployment settings
- **`netlify.toml`** - Netlify deployment settings  
- **`Dockerfile`** - Docker container configuration
- **`.dockerignore`** - Docker build exclusions

### CI/CD Pipeline
- **`.github/workflows/ci.yml`** - GitHub Actions automation

### PWA & SEO
- **`apps/landing/public/manifest.json`** - Progressive Web App manifest
- **`apps/landing/public/robots.txt`** - Search engine crawling rules

## 📚 Documentation

- **`DEPLOYMENT.md`** - Comprehensive deployment guide
- **`TECH_SPEC.md`** - Technical architecture specification
- **`README.md`** - Project overview and setup instructions
- **`packages/*/README.md`** - Package-specific documentation

## 🔧 Build & Deploy Commands

```bash
# Development
make dev                    # Start dev server
make build                  # Build project
make type-check            # Type checking

# Deployment
make deploy-vercel         # Deploy to Vercel
make deploy-netlify        # Deploy to Netlify
make deploy-docker         # Deploy with Docker

# Utilities
make lighthouse            # Performance audit
make analyze               # Bundle analysis
make security-audit        # Security check
make help                  # Show all commands
```
