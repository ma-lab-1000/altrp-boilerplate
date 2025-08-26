# 🚀 Deployment Guide

This guide covers deployment options for the `lnd-boilerplate` platform.

## 📋 Prerequisites

- Node.js 18+ or Bun 1.0+
- Git repository access
- Deployment platform accounts (Vercel, Netlify, etc.)

## 🏗️ Build Commands

```bash
# Install dependencies
bun install

# Type checking
bun run type-check

# Build for production
bun run build

# Start production server
bun run start
```

## 🌐 Platform Deployments

### Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   make deploy-vercel
   # or manually:
   vercel --prod
   ```

3. **Configuration:**
   - Uses `vercel.json` for build settings
   - Automatically detects Next.js framework
   - Supports edge functions and serverless

### Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   make deploy-netlify
   # or manually:
   netlify deploy --prod
   ```

3. **Configuration:**
   - Uses `netlify.toml` for build settings
   - Supports form handling and serverless functions
   - Automatic HTTPS and CDN

### Docker

1. **Build and Run:**
   ```bash
   make deploy-docker
   # or step by step:
   make docker-build
   make docker-run
   ```

2. **Custom Port:**
   ```bash
   docker run -p 8080:3000 lnd-boilerplate
   ```

3. **Environment Variables:**
   ```bash
   docker run -e NODE_ENV=production -p 3000:3000 lnd-boilerplate
   ```

## 🔧 Environment Configuration

### Required Environment Variables

```bash
# .env.local
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Build-time Variables

```bash
# next.config.js
const nextConfig = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}
```

## 📊 Performance Optimization

### Lighthouse Audit

```bash
make lighthouse
```

This generates a performance report at `./lighthouse-report.html`.

### Bundle Analysis

```bash
make analyze
```

Analyzes JavaScript bundle sizes and identifies optimization opportunities.

## 🔒 Security

### Security Headers

The platform includes security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Security Audit

```bash
make security-audit
```

Runs security checks on dependencies.

## 🚀 CI/CD Pipeline

### GitHub Actions

The `.github/workflows/ci.yml` file provides:

1. **Automated Testing:**
   - Type checking
   - Linting
   - Building
   - Testing

2. **Deployment Stages:**
   - Staging (develop branch)
   - Production (main branch)

3. **Security:**
   - Dependency scanning
   - Code quality checks

### Manual Deployment

```bash
# Staging
git checkout develop
git pull origin develop
make deploy-vercel

# Production
git checkout main
git pull origin main
make deploy-vercel
```

## 📱 Progressive Web App (PWA)

### PWA Configuration

1. **Manifest:**
   ```json
   // public/manifest.json
   {
     "name": "LND Boilerplate",
     "short_name": "LND",
     "start_url": "/",
     "display": "standalone",
     "theme_color": "#000000",
     "background_color": "#ffffff"
   }
   ```

2. **Service Worker:**
   - Automatic caching strategies
   - Offline support
   - Background sync

## 🌍 Internationalization

### Locale Configuration

```bash
# Supported locales
/en - English (default)
/es - Spanish
/fr - French
/de - German
```

### Content Localization

- UI strings: `public/locales/{locale}.json`
- MDX content: `{filename}.{locale}.mdx`
- Automatic locale detection

## 📈 Monitoring

### Performance Monitoring

- Core Web Vitals tracking
- Error boundary implementation
- Real User Monitoring (RUM)

### Analytics

- Google Analytics 4
- Custom event tracking
- Performance metrics

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures:**
   ```bash
   # Clean and rebuild
   make clean-all
   bun install
   bun run build
   ```

2. **Runtime Errors:**
   ```bash
   # Check logs
   docker logs <container-id>
   
   # Restart container
   make docker-stop
   make docker-run
   ```

3. **Performance Issues:**
   ```bash
   # Run performance audit
   make lighthouse
   
   # Analyze bundle
   make analyze
   ```

### Support

- Check [GitHub Issues](https://github.com/your-repo/issues)
- Review [TECH_SPEC.md](./TECH_SPEC.md)
- Consult [README.md](./README.md)

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Docker Documentation](https://docs.docker.com/)
