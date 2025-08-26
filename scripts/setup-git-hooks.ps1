# Setup Git hooks for language validation
# This script installs pre-commit and commit-msg hooks

Write-Host "🔧 Setting up Git hooks for language validation..." -ForegroundColor Green

# Get the directory of the script
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir

# Create .git/hooks directory if it doesn't exist
$GitHooksDir = Join-Path $ProjectRoot ".git\hooks"
if (-not (Test-Path $GitHooksDir)) {
    New-Item -ItemType Directory -Path $GitHooksDir -Force | Out-Null
}

# Copy hooks from .githooks to .git/hooks
$PreCommitSource = Join-Path $ProjectRoot ".githooks\pre-commit"
$PreCommitTarget = Join-Path $GitHooksDir "pre-commit"

if (Test-Path $PreCommitSource) {
    Copy-Item $PreCommitSource $PreCommitTarget -Force
    Write-Host "✅ Pre-commit hook installed" -ForegroundColor Green
} else {
    Write-Host "❌ Pre-commit hook not found in .githooks/" -ForegroundColor Red
}

$CommitMsgSource = Join-Path $ProjectRoot ".githooks\commit-msg"
$CommitMsgTarget = Join-Path $GitHooksDir "commit-msg"

if (Test-Path $CommitMsgSource) {
    Copy-Item $CommitMsgSource $CommitMsgTarget -Force
    Write-Host "✅ Commit-msg hook installed" -ForegroundColor Green
} else {
    Write-Host "❌ Commit-msg hook not found in .githooks/" -ForegroundColor Red
}

# Make validation script executable (if on Unix-like system)
$ValidateScript = Join-Path $ProjectRoot "scripts\validate-language.sh"
if (Test-Path $ValidateScript) {
    Write-Host "✅ Language validation script found" -ForegroundColor Green
} else {
    Write-Host "❌ Language validation script not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Git hooks setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "The following validations will now run:" -ForegroundColor Yellow
Write-Host "  • Pre-commit: Validates staged files for Russian characters" -ForegroundColor White
Write-Host "  • Commit-msg: Validates commit messages for Russian characters" -ForegroundColor White
Write-Host ""
Write-Host "GitHub Actions will validate:" -ForegroundColor Yellow
Write-Host "  • PR titles and descriptions" -ForegroundColor White
Write-Host "  • Issue titles and descriptions" -ForegroundColor White
Write-Host "  • Comments on issues and PRs" -ForegroundColor White
Write-Host "  • Commit messages in pushes" -ForegroundColor White
Write-Host "  • Code comments and documentation" -ForegroundColor White
Write-Host ""
Write-Host "To bypass validation (not recommended):" -ForegroundColor Yellow
Write-Host '  git commit --no-verify -m "your message"' -ForegroundColor White
Write-Host ""
Write-Host 'To uninstall hooks:' -ForegroundColor Yellow
Write-Host '  Remove-Item .git\hooks\pre-commit, .git\hooks\commit-msg' -ForegroundColor White
Write-Host ""
Write-Host 'To test validation:' -ForegroundColor Yellow
Write-Host '  bash scripts/validate-language.sh' -ForegroundColor White