#!/bin/bash
# Antigravity Repository Scanner
# Usage: chmod +x audit-repo.sh && ./audit-repo.sh

echo "🛰️  ANTIGRAVITY SCAN INITIATED"
echo "Target: $(basename $(pwd))"
echo "================================"

# 1. MONOLITH DETECTION
echo -e "\n📦 MONOLITH DETECTION (Files >300 lines):"
# Exclude node_modules, .next, dist, .gemini, .local, .cache, .antigravity and the script itself
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -not -path "*/dist/*" \
  -not -path "*/.gemini/*" \
  -not -path "*/.local/*" \
  -not -path "*/.cache/*" \
  -not -path "*/.antigravity/*" \
  -not -name "audit-repo.sh" \
  -exec wc -l {} + | awk '$1 > 300 {print "⚠️  " $1 " lines: " $2}'

# 2. VIBECODE DETECTION
echo -e "\n🔍 VIBECODE VARIABLE SCAN:"
grep -rn "\bval\b\|\btemp\b\|\bdata\b\|\bitem\b\|\bobj\b" \
  --include="*.ts" --include="*.tsx" --include="*.js" \
  --exclude-dir={node_modules,.next,dist,.gemini,.local,.cache,.antigravity} | \
  grep -v "interface\|type\|//\|/*\|export const metadata" | head -20 || echo "✅ Clean"

# 3. SECURITY AUDIT
echo -e "\n🔒 SECURITY AUDIT:"
# Check for secrets in history
if git log --all --full-history --source -- '*.{env,pem,key,secrets}' 2>/dev/null | grep -q .; then
  echo "⚠️  SECRETS IN HISTORY - Run: git-filter-repo or BFG"
fi

# Check for env files tracked by git
tracked_env=$(git ls-files '.env*')
if [ ! -z "$tracked_env" ]; then
  echo "⚠️  ENV FILES TRACKED BY GIT:"
  echo "$tracked_env" | grep -v "example\|template"
else
  echo "✅ No tracked production .env files"
fi

# Check for console statements in src
echo -e "\n📝 CONSOLE STATEMENTS (Production Risk):"
grep -rn "console\." --include="*.ts" --include="*.tsx" \
  --exclude-dir={node_modules,.next,dist,.gemini,.local,.cache,.antigravity} \
  | grep -v "eslint-disable" | wc -l | xargs echo "Found:"

# 4. DOCUMENTATION AUDIT
echo -e "\n📄 DOCUMENTATION STATUS:"
files=("README.md" "LICENSE" "CONTRIBUTING.md" "SECURITY.md" ".gitignore")
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    lines=$(wc -l < "$file")
    echo "✅ $file ($lines lines)"
  else
    echo "❌ MISSING: $file"
  fi
done

# 5. PACKAGE AUDIT
echo -e "\n📦 DEPENDENCY AUDIT:"
# Try to run npm audit in myportfolio2026 subdirectory if it exists
if [ -d "myportfolio2026" ]; then
  (cd myportfolio2026 && npm audit --audit-level=moderate 2>/dev/null | tail -5) || echo "Run manually: npm audit"
else
  npm audit --audit-level=moderate 2>/dev/null | tail -5 || echo "Run manually: npm audit"
fi

echo -e "\n================================"
echo "🎯 SCAN COMPLETE"
