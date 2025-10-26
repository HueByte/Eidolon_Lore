# Scripts Documentation

This directory contains utility scripts for maintaining the Eidolon Line Lore Wiki.

## Available Scripts

### `lint-markdown.ps1` (PowerShell)

Lints all markdown files in the `src/lore/` directory using markdownlint-cli.

**Usage:**
```powershell
# Lint markdown files
pwsh scripts/lint-markdown.ps1

# Auto-fix issues
pwsh scripts/lint-markdown.ps1 -Fix

# Verbose output
pwsh scripts/lint-markdown.ps1 -Verbose

# Custom path
pwsh scripts/lint-markdown.ps1 -Path "docs/**/*.md"
```

**Features:**
- Cross-platform PowerShell script
- Uses `npx markdownlint-cli` for linting
- Auto-fix mode with `-Fix` flag
- Colored console output
- File counting and statistics
- Auto-syncs fixed files to `public/lore/`

### `lint-markdown.sh` (Bash)

Bash equivalent of the PowerShell script for Unix-like systems.

**Usage:**
```bash
# Lint markdown files
bash scripts/lint-markdown.sh

# Auto-fix issues
bash scripts/lint-markdown.sh --fix

# Verbose output
bash scripts/lint-markdown.sh --verbose

# Custom path
bash scripts/lint-markdown.sh --path "docs/**/*.md"
```

**Features:**
- Identical functionality to PowerShell version
- Colored terminal output
- Cross-platform compatible

### NPM Scripts

The recommended way to run these scripts:

```bash
# Lint markdown files (tries PowerShell first, falls back to Bash)
npm run lint:md

# Auto-fix markdown issues
npm run lint:md:fix

# Lint all (ESLint + Markdown)
npm run lint:all
```

## Configuration

Markdown linting rules are configured in [`.markdownlint.json`](../.markdownlint.json).

## CI/CD Integration

These scripts are used in GitHub Actions workflows:

- **Lint Workflow** ([`.github/workflows/lint.yml`](../.github/workflows/lint.yml)) - Runs on every push to master
- **Deploy Workflow** ([`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)) - Depends on successful linting

The workflows use `npx markdownlint-cli` directly for consistency.

## Related Documentation

- [Linting Guide](../docs/LINTING.md) - Complete markdown linting documentation
- [Setup Guide](../docs/SETUP.md) - Project setup instructions

## Adding New Scripts

When adding new scripts to this directory:

1. Create both PowerShell (`.ps1`) and Bash (`.sh`) versions for cross-platform support
2. Make bash scripts executable: `chmod +x scripts/your-script.sh`
3. Add npm script to `package.json` with fallback pattern
4. Document the script in this README
5. Update related workflows if needed

---

For more information, see the main [README.md](../README.md)
