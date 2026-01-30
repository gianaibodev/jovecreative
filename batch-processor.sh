#!/bin/bash
# Antigravity Batch Processor
# Usage: ./batch-processor.sh repo1 repo2 repo3...

REPOS=("$@")

if [ ${#REPOS[@]} -eq 0 ]; then
  echo "❌ No repositories specified."
  echo "Usage: ./batch-processor.sh path/to/repo1 path/to/repo2"
  exit 1
fi

# Ensure templates exist
if [ ! -d "templates" ]; then
  echo "❌ templates/ directory not found. Please run this from the antigravity root."
  exit 1
fi

for repo in "${REPOS[@]}"; do
  echo -e "\n🚀 PROCESSING: $repo"
  echo "================================"
  
  if [ ! -d "$repo" ]; then
    echo "❌ Directory $repo not found. Skipping."
    continue
  fi

  # Enter repo
  cd "$repo" || continue
  
  # Git sanity check
  if [ ! -d ".git" ]; then
    echo "⚠️  Not a git repository. Skipping."
    cd - > /dev/null
    continue
  fi

  # Create branch
  BRANCH_NAME="refactor/antigravity-hardening-$(date +%Y%m%d)"
  git checkout -b "$BRANCH_NAME" 2>/dev/null || git checkout "$BRANCH_NAME"
  
  # Apply templates if missing
  echo "📄 Applying templates..."
  [ ! -f "CONTRIBUTING.md" ] && cp ../templates/CONTRIBUTING.md . && echo "✅ Added CONTRIBUTING.md"
  [ ! -f "SECURITY.md" ] && cp ../templates/SECURITY.md . && echo "✅ Added SECURITY.md"
  
  # Merge .gitignore
  if [ -f "templates/.gitignore" ]; then
    echo "🛡️  Merging .gitignore..."
    cat ../templates/.gitignore >> .gitignore
    sort -u .gitignore -o .gitignore
  fi

  # CI/CD Workflow
  echo "🤖 Adding Quality Gate workflow..."
  mkdir -p .github/workflows
  cp ../.github/workflows/antigravity.yml .github/workflows/
  
  # Audit scan
  echo -e "\n🛰️  Running pre-commit audit..."
  "$(dirname "$0")"/audit-repo.sh
  
  # Commit changes
  echo -e "\n💾 Committing changes..."
  git add .
  git commit -m "refactor(security): apply Antigravity hardening protocol

- Added enterprise documentation standards
- Implemented CI/CD quality gates
- Hardened .gitignore for security
- Prepared for public release"
  
  echo "✨ $repo processing complete. Branch: $BRANCH_NAME"
  
  # Go back
  cd - > /dev/null
done

echo -e "\n================================"
echo "🎯 BATCH PROCESSING COMPLETE"
