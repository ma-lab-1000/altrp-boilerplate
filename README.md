# LND Boilerplate

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/your-org/lnd-boilerplate)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

Modern landing page boilerplate with monorepo architecture built with Next.js, TypeScript, Tailwind CSS, and MDX.

## 🏗️ Architecture

- **Monorepo Structure**: Organized packages for UI components and utilities
- **Next.js 14**: App Router with TypeScript support
- **Tailwind CSS**: Utility-first CSS framework with design system
- **MDX**: Markdown with JSX support for content management
- **Component Library**: Reusable UI components organized in tiers

## 📁 Project Structure

```
lnd-boilerplate/
├── packages/
│   ├── ui/                 # UI component library
│   │   └── src/
│   │       ├── components/ # Marketing, Ecommerce, Navigation
│   │       ├── templates/  # Page layouts
│   │       ├── primitives/ # Base components
│   │       └── lib/        # UI utilities
│   └── utils/              # Utility functions
│       └── src/
│           ├── content/    # MDX and content utilities
│           ├── seo/        # SEO and metadata
│           ├── search/     # Search functionality
│           └── formatters/ # Date and currency formatting
├── apps/
│   └── landing/           # Next.js landing page application
└── tsconfig.json          # Global TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lnd-boilerplate
```

2. Install dependencies:
```bash
bun install
```

3. Start development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run type-check` - Run TypeScript type checking

## 🎨 Component System

### Tiers

1. **Primitives** - Atomic components (Button, Card, Heading, Text)
2. **Compositions** - Complex components built from primitives
3. **Templates** - Page-level layouts

### Available Components

- **Marketing**: Hero, FeatureGrid, PricingTable, Testimonials
- **Ecommerce**: ProductList, ProductCard, Filters
- **Navigation**: Header, Footer, TableOfContents
- **MDX**: MDXProvider, AdBlock, CoverImage

## 🔧 Development

### Adding New Components

1. Create component in appropriate package directory
2. Export from package index
3. Update main exports if needed

### Adding New Pages

1. Create page in `apps/landing/app/`
2. Use appropriate template from UI library
3. Add content and styling

## 📚 Documentation

- [Project Documentation](./dev/docs/lnd-boilerplate/) - Complete project documentation
- [Deployment Guide](./dev/docs/lnd-boilerplate/DEPLOYMENT.md) - Deployment instructions
- [Project Structure](./dev/docs/lnd-boilerplate/structure.md) - Detailed project structure
- [Dev Agent Documentation](./dev/docs/) - Development tools documentation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests and type checking
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.
