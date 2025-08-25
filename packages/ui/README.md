# @lnd/ui

UI component library for the LND Boilerplate platform.

## 🏗️ Architecture

The UI library follows a **3-tier component architecture**:

### 1. **Primitives (Tier 1)**
Atomic components that form the foundation of the design system:
- `Button` - Various button styles and sizes
- `Card` - Card container with header, content, and footer
- `Heading` - Typography headings with configurable levels
- `Text` - Text components with different variants

### 2. **Compositions (Tier 2)**
Complex components built from primitives to solve business tasks:

#### Marketing Components
- `Hero` - Above-the-fold hero section with CTA buttons
- `FeatureGrid` - Grid of features/benefits
- `PricingTable` - Pricing plans comparison table

#### Ecommerce Components
- `ProductList` - Grid/list of products/posts
- `ProductCard` - Individual product/post card

#### Navigation Components
- `Header` - Site header with navigation and mobile menu
- `Footer` - Site footer with links and information

### 3. **Templates (Tier 3)**
Page-level layouts that define overall structure:
- `PublicLayout` - Basic layout with header and footer
- `PageLayout` - For detailed content pages with sidebar
- `CollectionLayout` - For list/collection pages
- `FullPageLayout` - Blank canvas layout

## 🚀 Usage

### Installation

The package is automatically available in the monorepo workspace.

### Basic Usage

```tsx
import { Hero, Button } from '@lnd/ui'

export default function HomePage() {
  return (
    <Hero
      title="Welcome to LND"
      description="Modern landing page boilerplate"
      ctaButtons={[
        { text: 'Get Started', variant: 'default' },
        { text: 'Learn More', variant: 'outline' }
      ]}
    />
  )
}
```

### Using Templates

```tsx
import { PublicLayout, CollectionLayout } from '@lnd/ui/templates'

export default function BlogPage() {
  return (
    <CollectionLayout
      title="Blog"
      description="Latest articles and insights"
    >
      {/* Your content here */}
    </CollectionLayout>
  )
}
```

## 🎨 Design System

### Colors
Uses CSS custom properties for consistent theming:
- `--primary` - Primary brand color
- `--secondary` - Secondary color
- `--accent` - Accent color
- `--muted` - Muted text and backgrounds
- `--destructive` - Error and warning colors

### Spacing
Consistent spacing scale using Tailwind CSS:
- `p-4`, `p-6`, `p-8` for component padding
- `py-24`, `py-32` for section spacing
- `gap-4`, `gap-6`, `gap-8` for grid spacing

### Typography
- Uses Inter font family
- Responsive heading sizes
- Consistent text variants (default, muted, small, large)

## 🔧 Customization

### Theme Overrides
Override CSS custom properties in your global styles:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
}
```

### Component Variants
Most components support multiple variants:

```tsx
<Button variant="outline" size="lg">
  Custom Button
</Button>
```

### Responsive Design
All components are mobile-first and responsive:
- Mobile-first breakpoints
- Adaptive layouts
- Touch-friendly interactions

## 📱 Responsive Behavior

- **Mobile**: Single column layouts, stacked navigation
- **Tablet**: Two-column grids, expanded navigation
- **Desktop**: Multi-column layouts, full navigation

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## 🧪 Testing

Run the component library tests:

```bash
bun run --cwd packages/ui test
```

## 📚 Examples

See the main application (`apps/landing`) for complete usage examples of all components.

## 🤝 Contributing

1. Create components in appropriate tier directories
2. Follow the established patterns and naming conventions
3. Add TypeScript interfaces for all props
4. Include responsive design considerations
5. Test across different screen sizes
6. Update this README with new components
