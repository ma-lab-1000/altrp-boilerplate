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
