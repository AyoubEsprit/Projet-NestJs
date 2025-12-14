# 🔥 Execute Git History Cleanup - Step by Step

## ⚠️ CRITICAL WARNING

**This will PERMANENTLY DELETE all Git history and create a fresh repository!**

**Before proceeding:**
1. ✅ Backup created: `backup-before-cleanup` branch
2. ✅ Security fixes committed
3. ✅ Team members notified
4. ✅ You understand this is IRREVERSIBLE

---

## 🚀 Execution Steps

### Current Status
```
✅ Backup branch created: backup-before-cleanup
✅ Security commit created: ceba329
✅ Ready for history cleanup
```

---

## 📋 Method 1: Complete History Rewrite (RECOMMENDED)

This method removes ALL previous commits and starts fresh with only the security-fixed version.

### Step 1: Remove Git Directory
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .git

# Linux/Mac
rm -rf .git
```

### Step 2: Initialize Fresh Repository
```bash
git init
```

### Step 3: Add All Files
```bash
# .env is already in .gitignore, so it won't be added
git add .
```

### Step 4: Create Clean Initial Commit
```bash
git commit -m "🎉 Initial commit with secure configuration

✅ Security Features:
- Environment variables for sensitive data (.env)
- MongoDB credentials NOT in code
- Configurable port via environment
- TypeORM settings via environment
- .env.example template provided

✅ Project Features:
- NestJS TypeScript project
- MongoDB with TypeORM
- Workshop modules (Atelier 1 & 2)
- Vehicle management system
- Complete CRUD operations
- Data serialization interceptors
- Advanced MongoDB queries

✅ Documentation:
- Complete workshop guides
- Security documentation
- Quick start guide
- API documentation
- Postman collection

⚠️ IMPORTANT:
1. Copy .env.example to .env
2. Update .env with your settings
3. Never commit .env to Git

See SECURITY_FIXES.md for details."
```

### Step 5: Add Remote
```bash
git remote add origin https://github.com/AyoubEsprit/Projet-NestJs.git
```

### Step 6: Force Push (DESTRUCTIVE)
```bash
# This OVERWRITES GitHub history
git push origin main --force
```

---

## 📋 Method 2: Using git filter-branch (ADVANCED)

If you want to keep some commit history but remove secrets:

### Step 1: Filter Sensitive Files
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch src/app.module.ts src/main.ts" \
  --prune-empty --tag-name-filter cat -- --all
```

### Step 2: Clean Refs
```bash
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### Step 3: Force Push
```bash
git push origin --force --all
git push origin --force --tags
```

---

## 📋 Method 3: Using BFG Repo-Cleaner (POWERFUL)

### Step 1: Download BFG
```bash
# Download from: https://rtyley.github.io/bfg-repo-cleaner/
# Or use: wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar
```

### Step 2: Clone Mirror
```bash
git clone --mirror https://github.com/AyoubEsprit/Projet-NestJs.git
```

### Step 3: Run BFG
```bash
java -jar bfg.jar --delete-files "app.module.ts" Projet-NestJs.git
java -jar bfg.jar --delete-files "main.ts" Projet-NestJs.git
```

### Step 4: Clean and Push
```bash
cd Projet-NestJs.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

---

## ✅ Verification Commands

After cleanup, verify no secrets remain:

```bash
# Check commit history
git log --oneline

# Search for MongoDB URL in history
git log -p | grep -i "mongodb://localhost"

# Search for port 27017
git log -p | grep -i "27017"

# Search for hardcoded port 3000
git log -p | grep -i "listen(3000)"

# Check current files
git ls-files | grep -E "(app.module|main.ts)"

# Verify .env is NOT tracked
git ls-files | grep "\.env$"
```

Expected results:
- ✅ No "mongodb://localhost" in history
- ✅ No "27017" in history
- ✅ No "listen(3000)" in history
- ✅ .env NOT in git ls-files
- ✅ .env.example IS in git ls-files

---

## 🔄 Post-Cleanup Actions

### 1. Rotate All Credentials
```bash
# Change MongoDB password
# Update .env with new credentials
# Update production environment variables
```

### 2. Notify Team Members
Send this message:

```
🚨 URGENT: Git History Rewritten

The Git repository history has been completely rewritten to remove exposed secrets.

ACTION REQUIRED FOR ALL TEAM MEMBERS:

1. Backup your local changes:
   git stash
   git branch my-backup

2. Delete your local repository folder

3. Clone fresh from GitHub:
   git clone https://github.com/AyoubEsprit/Projet-NestJs.git
   cd Projet-NestJs

4. Setup environment:
   cp .env.example .env
   # Edit .env with your local settings

5. Restore your changes:
   # Manually apply your stashed changes

DO NOT:
- Try to pull/merge from old branches
- Push old commits
- Reuse the exposed MongoDB credentials

The old credentials are considered COMPROMISED.
```

### 3. Update CI/CD
- Update GitHub Actions secrets
- Update deployment environment variables
- Verify builds work with new .env approach

### 4. Enable GitHub Protections
```bash
# On GitHub repository settings:
1. Enable "Secret scanning"
2. Enable "Push protection"
3. Add branch protection rules
4. Require pull request reviews
```

---

## 🎯 Quick Execution Script

For Method 1 (Complete Fresh Start):

```bash
# Save this as cleanup.sh and run: bash cleanup.sh

#!/bin/bash
set -e

echo "🔥 Starting Git history cleanup..."

# Backup check
if ! git branch | grep -q "backup-before-cleanup"; then
    echo "❌ ERROR: Backup branch not found!"
    exit 1
fi

# Remove .git
echo "📁 Removing .git directory..."
rm -rf .git

# Initialize fresh repo
echo "🆕 Initializing fresh repository..."
git init

# Add files
echo "📦 Adding files..."
git add .

# Commit
echo "💾 Creating clean commit..."
git commit -m "🎉 Initial commit with secure configuration - See SECURITY_FIXES.md"

# Add remote
echo "🔗 Adding remote..."
git remote add origin https://github.com/AyoubEsprit/Projet-NestJs.git

# Force push
echo "🚀 Force pushing to GitHub..."
git push origin main --force

echo "✅ Cleanup complete!"
echo "⚠️  Remember to rotate MongoDB credentials!"
```

---

**⚠️ FINAL WARNING: This operation is IRREVERSIBLE. Proceed with caution!**

