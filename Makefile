# LND Boilerplate Makefile

.PHONY: help dev-help dev-test dev-build dev-clean dev-validate dev-update

help:
	@echo "LND Boilerplate - Available Commands:"
	@echo ""
	@echo "Dev Agent Commands (proxied to dev/ folder):"
	@echo "  dev-help      Show dev-agent help"
	@echo "  dev-test      Run dev-agent tests"
	@echo "  dev-build     Build dev-agent project"
	@echo "  dev-clean     Clean dev-agent build artifacts"
	@echo "  dev-validate  Validate dev-agent project structure"
	@echo "  dev-update    Update dev-agent subtree from remote"
	@echo ""
	@echo "For detailed dev-agent commands, run: make dev-help"

# Dev Agent Proxy Commands
dev-help:
	@cd dev && make help

dev-test:
	@cd dev && make test

dev-build:
	@cd dev && make build

dev-clean:
	@cd dev && make clean

dev-validate:
	@cd dev && make validate

dev-update:
	@echo "🔄 Updating dev-agent subtree..."
	@git subtree pull --prefix=dev https://github.com/GTFB/dev-agent.git main --squash
	@echo "✅ Dev-agent subtree updated successfully!"
	@echo "📝 Now you can commit the updates:"
	@echo "   git add ."
	@echo "   git commit -m 'Update dev-agent subtree'"
	@echo ""
	@echo "⚠️  IMPORTANT: Do not use git subtree push to send changes to dev-agent!"
	@echo "   All changes must go through issues and pull requests in dev-agent repository."

# Deployment
.PHONY: deploy-vercel deploy-netlify deploy-docker

deploy-vercel:
	@echo "🚀 Deploying to Vercel..."
	vercel --prod

deploy-netlify:
	@echo "🚀 Deploying to Netlify..."
	netlify deploy --prod

deploy-docker:
	@echo "🐳 Building and running Docker container..."
	docker build -t lnd-boilerplate .
	docker run -p 3000:3000 lnd-boilerplate

# Docker utilities
docker-build:
	@echo "🔨 Building Docker image..."
	docker build -t lnd-boilerplate .

docker-run:
	@echo "🏃 Running Docker container..."
	docker run -p 3000:3000 lnd-boilerplate

docker-stop:
	@echo "🛑 Stopping Docker containers..."
	docker stop $$(docker ps -q --filter ancestor=lnd-boilerplate)

# Production build
build-prod:
	@echo "🏗️ Building production version..."
	bun run build
	@echo "✅ Production build complete!"

# Performance check
lighthouse:
	@echo "📊 Running Lighthouse audit..."
	npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
	@echo "📊 Lighthouse report saved to ./lighthouse-report.html"

# Bundle analysis
analyze:
	@echo "📦 Analyzing bundle..."
	bun run --cwd apps/landing build
	npx @next/bundle-analyzer apps/landing/.next/static/chunks

# Security audit
security-audit:
	@echo "🔒 Running security audit..."
	bun audit
	npm audit --audit-level moderate

# Clean all
clean-all: clean
	@echo "🧹 Cleaning all generated files..."
	rm -rf apps/landing/.next
	rm -rf node_modules
	rm -rf packages/*/node_modules
	rm -rf apps/*/node_modules
	@echo "✅ All clean!"

# Help
help:
	@echo "Available commands:"
	@echo "  Development:"
	@echo "    dev          - Start development server"
	@echo "    build        - Build the project"
	@echo "    type-check   - Run TypeScript type checking"
	@echo "    lint         - Run linting"
	@echo "  Deployment:"
	@echo "    deploy-vercel    - Deploy to Vercel"
	@echo "    deploy-netlify   - Deploy to Netlify"
	@echo "    deploy-docker    - Deploy using Docker"
	@echo "    docker-build     - Build Docker image"
	@echo "    docker-run       - Run Docker container"
	@echo "  Utilities:"
	@echo "    lighthouse       - Run Lighthouse audit"
	@echo "    analyze          - Analyze bundle size"
	@echo "    security-audit   - Run security audit"
	@echo "    clean-all        - Clean all files"
	@echo "    help             - Show this help"
