#!/bin/bash

# Language validation script for commits and PRs
# Prevents Russian/Cyrillic characters in code

set -e

echo "🔍 Validating language..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check for Cyrillic characters
check_cyrillic() {
    local text="$1"
    local context="$2"
    
    if echo "$text" | grep -q '[а-яё]'; then
        echo -e "${RED}❌ Error: $context contains Russian characters${NC}"
        echo -e "${YELLOW}Text: $text${NC}"
        echo -e "${YELLOW}Please use English only${NC}"
        return 1
    fi
    
    if echo "$text" | grep -qi '[а-яё]'; then
        echo -e "${RED}❌ Error: $context contains Russian characters${NC}"
        echo -e "${YELLOW}Text: $text${NC}"
        echo -e "${YELLOW}Please use English only${NC}"
        return 1
    fi
    
    return 0
}

# Validate commit message if in git hook context
if [ -n "$1" ]; then
    COMMIT_MSG_FILE="$1"
    if [ -f "$COMMIT_MSG_FILE" ]; then
        COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")
        echo "Validating commit message..."
        if ! check_cyrillic "$COMMIT_MSG" "commit message"; then
            exit 1
        fi
        echo -e "${GREEN}✅ Commit message validation passed${NC}"
    fi
fi

# Validate staged files
echo "Validating staged files..."

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

if [ -z "$STAGED_FILES" ]; then
    echo -e "${GREEN}✅ No staged files to validate${NC}"
    exit 0
fi

RUSSIAN_FOUND=false

for file in $STAGED_FILES; do
    # Skip binary files and certain directories
    if [[ "$file" =~ \.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|pdf|zip|tar|gz)$ ]] || 
       [[ "$file" =~ ^(node_modules|\.next|\.git|dist|build)/ ]]; then
        continue
    fi
    
    # Check if file exists and is text
    if [ -f "$file" ] && file "$file" | grep -q "text"; then
        echo "Checking $file..."
        
        # Check for Russian characters in the file
        if grep -q '[а-яё]' "$file"; then
            echo -e "${RED}❌ Error: $file contains Russian characters${NC}"
            echo -e "${YELLOW}Lines with Russian text:${NC}"
            grep -n '[а-яё]' "$file" | head -5
            RUSSIAN_FOUND=true
        fi
    fi
done

if [ "$RUSSIAN_FOUND" = true ]; then
    echo -e "${RED}❌ Language validation failed${NC}"
    echo -e "${YELLOW}Please use English only in code comments and documentation${NC}"
    echo -e "${YELLOW}Allowed languages: English only${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Language validation passed${NC}"
exit 0
