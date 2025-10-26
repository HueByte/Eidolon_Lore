#!/usr/bin/env pwsh

<#
.SYNOPSIS
    Runs markdownlint on all Markdown files in the Eidolon Lore repository.

.DESCRIPTION
    This script installs markdownlint-cli if not present and runs it on all Markdown files
    in the lore/content directory, using the configuration from .markdownlint.json.

.PARAMETER Fix
    Automatically fix issues that can be fixed automatically.

.PARAMETER Verbose
    Show verbose output during linting.

.PARAMETER Path
    Specific path or file to lint (defaults to lore/content/**/*.md).

.EXAMPLE
    .\scripts\lint-markdown.ps1
    Run markdownlint on all lore Markdown files

.EXAMPLE
    .\scripts\lint-markdown.ps1 -Fix
    Run markdownlint and automatically fix issues

.EXAMPLE
    .\scripts\lint-markdown.ps1 -Path "lore/content/concepts/*.md"
    Run markdownlint only on concept files

.EXAMPLE
    .\scripts\lint-markdown.ps1 -Verbose
    Run markdownlint with verbose output
#>

param(
    [switch]$Fix,
    [switch]$Verbose,
    [string]$Path = "lore/content/**/*.md"
)

# Colors for output
$ErrorColor = "Red"
$SuccessColor = "Green"
$InfoColor = "Cyan"
$WarningColor = "Yellow"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Test-NodeInstalled {
    try {
        $null = node --version 2>$null
        return $true
    }
    catch {
        return $false
    }
}

function Test-MarkdownlintInstalled {
    try {
        $null = npx markdownlint-cli --version 2>$null
        return $true
    }
    catch {
        return $false
    }
}

# Change to repository root
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptDir
Push-Location $repoRoot

try {
    Write-ColorOutput "🔍 Eidolon Lore - Markdown Linter" $InfoColor
    Write-ColorOutput "==================================" $InfoColor
    Write-ColorOutput ""

    # Check if Node.js is installed
    if (-not (Test-NodeInstalled)) {
        Write-ColorOutput "❌ Node.js is not installed or not in PATH" $ErrorColor
        Write-ColorOutput "Please install Node.js from https://nodejs.org/" $WarningColor
        exit 1
    }

    $nodeVersion = node --version
    Write-ColorOutput "✅ Node.js version: $nodeVersion" $SuccessColor

    # Check if npm packages are installed
    if (-not (Test-Path "node_modules")) {
        Write-ColorOutput "⚠️  node_modules not found, installing dependencies..." $WarningColor
        try {
            npm install
            Write-ColorOutput "✅ Dependencies installed successfully" $SuccessColor
        }
        catch {
            Write-ColorOutput "❌ Failed to install dependencies" $ErrorColor
            Write-ColorOutput "Error: $_" $ErrorColor
            exit 1
        }
    }

    Write-ColorOutput ""

    # Check for markdownlint configuration
    if (Test-Path ".markdownlint.json") {
        Write-ColorOutput "📋 Using configuration from .markdownlint.json" $InfoColor
        $configFile = ".markdownlint.json"
    }
    else {
        Write-ColorOutput "⚠️  No .markdownlint.json found, using default rules" $WarningColor
        $configFile = $null
    }

    # Count files
    $mdFiles = Get-ChildItem -Path "src/lore" -Filter "*.md" -Recurse -File
    $fileCount = $mdFiles.Count

    if ($fileCount -eq 0) {
        Write-ColorOutput "⚠️  No markdown files found in src/lore/" $WarningColor
        exit 0
    }

    Write-ColorOutput "Found $fileCount markdown file(s) to lint" $InfoColor
    Write-ColorOutput ""

    # Build markdownlint command
    $markdownlintArgs = @()

    # Add path
    $markdownlintArgs += $Path

    # Add ignore patterns
    $markdownlintArgs += "--ignore"
    $markdownlintArgs += "node_modules/**"
    $markdownlintArgs += "--ignore"
    $markdownlintArgs += "dist/**"
    $markdownlintArgs += "--ignore"
    $markdownlintArgs += ".git/**"
    $markdownlintArgs += "--ignore"
    $markdownlintArgs += "README.md"
    $markdownlintArgs += "--ignore"
    $markdownlintArgs += "*.md"

    # Add configuration file if present
    if ($configFile) {
        $markdownlintArgs += "--config"
        $markdownlintArgs += $configFile
    }

    # Add fix flag if requested
    if ($Fix) {
        $markdownlintArgs += "--fix"
        Write-ColorOutput "🔧 Auto-fix mode enabled" $InfoColor
    }

    Write-ColorOutput "🚀 Running markdownlint..." $InfoColor
    if ($Verbose) {
        Write-ColorOutput "Command: npx markdownlint-cli $($markdownlintArgs -join ' ')" $InfoColor
    }
    Write-ColorOutput ""

    # Run markdownlint
    try {
        $output = & npx markdownlint-cli @markdownlintArgs 2>&1
        $exitCode = $LASTEXITCODE

        if ($exitCode -eq 0) {
            Write-ColorOutput "✅ All markdown files passed linting!" $SuccessColor
            Write-ColorOutput ""
            Write-ColorOutput "  $fileCount file(s) checked" $InfoColor
            Write-ColorOutput "  0 errors found" $InfoColor
            Write-ColorOutput ""

            if ($Fix) {
                Write-ColorOutput "🎉 Auto-fix completed!" $SuccessColor
                Write-ColorOutput "📋 Copying fixed files to website/public/lore/..." $InfoColor

                # Copy fixed files to public
                $null = New-Item -ItemType Directory -Force -Path "website/public/lore/concepts"
                $null = New-Item -ItemType Directory -Force -Path "website/public/lore/systems"
                $null = New-Item -ItemType Directory -Force -Path "website/public/lore/locations"

                Copy-Item -Path "lore/content/concepts/*.md" -Destination "website/public/lore/concepts/" -Force -ErrorAction SilentlyContinue
                Copy-Item -Path "lore/content/systems/*.md" -Destination "website/public/lore/systems/" -Force -ErrorAction SilentlyContinue
                Copy-Item -Path "lore/content/locations/*.md" -Destination "website/public/lore/locations/" -Force -ErrorAction SilentlyContinue

                Write-ColorOutput "✓ Files synchronized to website/public/lore/" $SuccessColor
                Write-ColorOutput ""
            }
        }
        else {
            Write-ColorOutput "❌ Markdown linting failed!" $ErrorColor
            Write-ColorOutput ""
            Write-ColorOutput "Issues found:" $ErrorColor
            Write-ColorOutput ""
            Write-Output $output
            Write-ColorOutput ""
            Write-ColorOutput "To fix issues automatically where possible, run:" $InfoColor
            Write-ColorOutput "  npm run lint:md:fix" $InfoColor
            Write-ColorOutput ""
            exit $exitCode
        }
    }
    catch {
        Write-ColorOutput "❌ Error running markdownlint: $_" $ErrorColor
        exit 1
    }
}
finally {
    Pop-Location
}
