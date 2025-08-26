# Language Validation System

This project enforces English-only language policy across all GitHub interactions to ensure code quality and maintainability.

## What is Validated

### 🔍 Local Git Hooks
- **Pre-commit**: Validates staged files for Russian/Cyrillic characters
- **Commit-msg**: Validates commit messages for Russian/Cyrillic characters

### 🚀 GitHub Actions
- **PR Titles & Descriptions**: All pull request content
- **Issue Titles & Descriptions**: All issue content  
- **Comments**: All comments on issues and PRs
- **Commit Messages**: All commit messages in pushes
- **Code Comments**: All code comments and documentation

## Setup

### 1. Install Git Hooks
```bash
bash scripts/setup-git-hooks.sh
```

### 2. Test Validation
```bash
bash scripts/validate-language.sh
```

## Rules

### ✅ Allowed
- English language only
- Standard ASCII characters
- Technical terms and code

### ❌ Not Allowed
- Russian/Cyrillic characters (а-я, ё)
- Any non-English text in:
  - Commit messages
  - PR titles/descriptions
  - Issue titles/descriptions
  - Comments
  - Code comments
  - Documentation

## Examples

### ✅ Good Commit Messages
```
feat: add user authentication system
fix: resolve memory leak in data processing
docs: update API documentation
refactor: simplify component structure
```

### ❌ Bad Commit Messages
```
feat: добавить систему аутентификации пользователей
fix: исправить утечку памяти
docs: обновить документацию API
```

### ✅ Good PR Titles
```
Implement user authentication system
Fix memory leak in data processing
Add comprehensive test coverage
```

### ❌ Bad PR Titles
```
Реализовать систему аутентификации пользователей
Исправить утечку памяти
Добавить полное покрытие тестами
```

## Bypassing Validation

### ⚠️ Not Recommended
```bash
# Bypass pre-commit hooks
git commit --no-verify -m "your message"

# Bypass commit-msg hooks  
git commit --no-verify -m "your message"
```

### 🔧 For Emergency Fixes
If you need to bypass validation for critical fixes:

1. Use `--no-verify` flag
2. Create a follow-up commit with proper English message
3. Document the bypass in the commit message

## Troubleshooting

### Common Issues

#### "Commit rejected due to language validation failure"
- Check your commit message for Russian characters
- Use English only in commit messages
- Check staged files for Russian comments

#### "PR validation failed"
- Check PR title and description
- Ensure all commit messages are in English
- Check code comments and documentation

#### "Comment validation failed"
- Use English only in GitHub comments
- Avoid Russian characters in issue/PR comments

### Getting Help

1. Check the validation output for specific errors
2. Review the rules above
3. Use translation tools if needed
4. Ask team members for help with English phrasing

## Configuration

### Customizing Validation

Edit `scripts/validate-language.sh` to:
- Add more file types to check
- Modify character patterns
- Add exceptions for specific files

### GitHub Actions

The validation runs automatically on:
- Pull requests (opened, edited, synchronized)
- Pushes to main/develop branches
- Issue comments (created, edited)
- Issues (opened, edited)

## Benefits

- **Consistency**: All team members use the same language
- **Maintainability**: Easier for international teams to understand
- **Professionalism**: Clean, professional codebase
- **Tooling**: Better compatibility with development tools
- **Documentation**: Consistent documentation language

## Support

For questions or issues with language validation:
1. Check this documentation
2. Review validation error messages
3. Contact the development team
4. Create an issue (in English) if you find bugs
