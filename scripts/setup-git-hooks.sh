#!/bin/bash

# Setup Git hooks for language validation
# This script installs pre-commit and commit-msg hooks

set -e

echo "🔧 Setting up Git hooks for language validation..."

# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Create .git/hooks directory if it doesn't exist
mkdir -p "$PROJECT_ROOT/.git/hooks"

# Copy hooks from .githooks to .git/hooks
if [ -f "$PROJECT_ROOT/.githooks/pre-commit" ]; then
    cp "$PROJECT_ROOT/.githooks/pre-commit" "$PROJECT_ROOT/.git/hooks/pre-commit"
    chmod +x "$PROJECT_ROOT/.git/hooks/pre-commit"
    echo "✅ Pre-commit hook installed"
else
    echo "❌ Pre-commit hook not found in .githooks/"
fi

if [ -f "$PROJECT_ROOT/.githooks/commit-msg" ]; then
    cp "$PROJECT_ROOT/.githooks/commit-msg" "$PROJECT_ROOT/.git/hooks/commit-msg"
    chmod +x "$PROJECT_ROOT/.git/hooks/commit-msg"
    echo "✅ Commit-msg hook installed"
else
    echo "❌ Commit-msg hook not found in .githooks/"
fi

# Make validation script executable
if [ -f "$PROJECT_ROOT/scripts/validate-language.sh" ]; then
    chmod +x "$PROJECT_ROOT/scripts/validate-language.sh"
    echo "✅ Language validation script made executable"
else
    echo "❌ Language validation script not found"
fi

echo ""
echo "🎉 Git hooks setup complete!"
echo ""
echo "The following validations will now run:"
echo "  • Pre-commit: Validates staged files for Russian characters"
echo "  • Commit-msg: Validates commit messages for Russian characters"
echo ""
echo "GitHub Actions will validate:"
echo "  • PR titles and descriptions"
echo "  • Issue titles and descriptions"
echo "  • Comments on issues and PRs"
echo "  • Commit messages in pushes"
echo "  • Code comments and documentation"
echo ""
echo "To bypass validation (not recommended):"
echo "  git commit --no-verify -m \"your message\""
echo ""
echo "To uninstall hooks:"
echo "  rm .git/hooks/pre-commit .git/hooks/commit-msg"
echo ""
echo "To test validation:"
echo "  bash scripts/validate-language.sh"
