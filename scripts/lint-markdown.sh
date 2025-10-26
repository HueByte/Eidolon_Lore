#!/usr/bin/env bash

# Eidolon Lore - Markdown Linter
# Runs markdownlint on all Markdown files in lore/content/

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Default values
FIX_MODE=false
VERBOSE=false
PATH_PATTERN="lore/content/**/*.md"

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --fix)
            FIX_MODE=true
            shift
            ;;
        --verbose)
            VERBOSE=true
            shift
            ;;
        --path)
            PATH_PATTERN="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --fix           Automatically fix issues"
            echo "  --verbose       Show verbose output"
            echo "  --path PATH     Specific path or pattern to lint (default: lore/content/**/*.md)"
            echo "  --help          Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                                      # Lint all files"
            echo "  $0 --fix                                # Lint and fix all files"
            echo "  $0 --path 'lore/content/concepts/*.md'     # Lint only concept files"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Get script directory and repository root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

echo -e "${CYAN}🔍 Eidolon Lore - Markdown Linter${NC}"
echo -e "${CYAN}==================================${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed or not in PATH${NC}"
    echo -e "${YELLOW}Please install Node.js from https://nodejs.org/${NC}"
    exit 1
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js version: $NODE_VERSION${NC}"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  node_modules not found, installing dependencies...${NC}"
    if npm install; then
        echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
fi

echo ""

# Check for markdownlint configuration
if [ -f ".markdownlint.json" ]; then
    echo -e "${CYAN}📋 Using configuration from .markdownlint.json${NC}"
    CONFIG_FILE=".markdownlint.json"
else
    echo -e "${YELLOW}⚠️  No .markdownlint.json found, using default rules${NC}"
    CONFIG_FILE=""
fi

# Count files
FILE_COUNT=$(find lore/content -name "*.md" -type f | wc -l | tr -d ' ')

if [ "$FILE_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}⚠️  No markdown files found in lore/content/${NC}"
    exit 0
fi

echo -e "${CYAN}Found $FILE_COUNT markdown file(s) to lint${NC}"
echo ""

# Build markdownlint command
MARKDOWNLINT_ARGS=("$PATH_PATTERN")

# Add ignore patterns
MARKDOWNLINT_ARGS+=(
    "--ignore" "node_modules/**"
    "--ignore" "dist/**"
    "--ignore" ".git/**"
    "--ignore" "README.md"
    "--ignore" "*.md"
)

# Add configuration file if present
if [ -n "$CONFIG_FILE" ]; then
    MARKDOWNLINT_ARGS+=("--config" "$CONFIG_FILE")
fi

# Add fix flag if requested
if [ "$FIX_MODE" = true ]; then
    MARKDOWNLINT_ARGS+=("--fix")
    echo -e "${CYAN}🔧 Auto-fix mode enabled${NC}"
fi

echo -e "${CYAN}🚀 Running markdownlint...${NC}"
if [ "$VERBOSE" = true ]; then
    echo -e "${CYAN}Command: npx markdownlint-cli ${MARKDOWNLINT_ARGS[*]}${NC}"
fi
echo ""

# Run markdownlint
if OUTPUT=$(npx markdownlint-cli "${MARKDOWNLINT_ARGS[@]}" 2>&1); then
    echo -e "${GREEN}✅ All markdown files passed linting!${NC}"
    echo ""
    echo -e "${CYAN}  $FILE_COUNT file(s) checked${NC}"
    echo -e "${CYAN}  0 errors found${NC}"
    echo ""

    if [ "$FIX_MODE" = true ]; then
        echo -e "${GREEN}🎉 Auto-fix completed!${NC}"
        echo -e "${CYAN}📋 Copying fixed files to website/public/lore/...${NC}"

        # Create directories
        mkdir -p website/public/lore/concepts
        mkdir -p website/public/lore/systems
        mkdir -p website/public/lore/locations

        # Copy fixed files
        cp -f lore/content/concepts/*.md website/public/lore/concepts/ 2>/dev/null || true
        cp -f lore/content/systems/*.md website/public/lore/systems/ 2>/dev/null || true
        cp -f lore/content/locations/*.md website/public/lore/locations/ 2>/dev/null || true

        echo -e "${GREEN}✓ Files synchronized to website/public/lore/${NC}"
        echo ""
    fi

    exit 0
else
    EXIT_CODE=$?
    echo -e "${RED}❌ Markdown linting failed!${NC}"
    echo ""
    echo -e "${RED}Issues found:${NC}"
    echo ""
    echo "$OUTPUT"
    echo ""
    echo -e "${CYAN}To fix issues automatically where possible, run:${NC}"
    echo -e "${CYAN}  npm run lint:md:fix${NC}"
    echo ""
    exit $EXIT_CODE
fi
