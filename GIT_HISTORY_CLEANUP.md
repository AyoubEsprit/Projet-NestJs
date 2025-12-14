# 🔥 Git History Cleanup - Remove Exposed Secrets

## ⚠️ CRITICAL: Secrets Exposed on GitHub

**Repository:** https://github.com/AyoubEsprit/Projet-NestJs.git  
**Issue:** MongoDB credentials and configuration exposed in commits  
**Action:** Complete history rewrite and force push

---

## 📋 Current Situation

### Commits with Exposed Secrets
```
2a3941e (HEAD -> main, origin/main) Data Serialization et MongoRepository
ac54341 Rendu Atelier3
c8dccdc first commit
```

### Exposed Information
- MongoDB connection string: `mongodb://localhost:27017/atelier-db`
- Application port: `3000`
- TypeORM synchronize flag: `true`

---

## 🛠️ Cleanup Procedure

### Step 1: Backup Current Work
```bash
# Create a backup branch
git branch backup-before-cleanup

# Verify backup
git branch -a
```

### Step 2: Add Security Fixes to Staging
```bash
# Add all security-related changes
git add .env.example
git add SECURITY_FIXES.md
git add SECURITY_SUMMARY.md
git add GIT_HISTORY_CLEANUP.md
git add src/app.module.ts
git add src/main.ts
git add package.json
git add package-lock.json
git add README.md
git add QUICK_START.md
git add DOCUMENTATION_INDEX.md

# Verify what will be committed
git status
```

### Step 3: Commit Security Fixes
```bash
git commit -m "🔒 Security: Remove hardcoded secrets and use environment variables

- Moved MongoDB URL to .env
- Moved application port to .env
- Moved TypeORM config to .env
- Added @nestjs/config for environment management
- Created .env.example template
- Updated documentation with security best practices

BREAKING CHANGE: Requires .env file configuration
See SECURITY_FIXES.md for migration guide"
```

### Step 4: Rewrite Git History (DESTRUCTIVE)
```bash
# Option A: Using git filter-repo (RECOMMENDED)
# Install: pip install git-filter-repo
git filter-repo --invert-paths --path src/app.module.ts --path src/main.ts --force

# Option B: Using BFG Repo-Cleaner (ALTERNATIVE)
# Download from: https://rtyley.github.io/bfg-repo-cleaner/
# java -jar bfg.jar --delete-files app.module.ts
# java -jar bfg.jar --delete-files main.ts
# git reflog expire --expire=now --all
# git gc --prune=now --aggressive

# Option C: Manual rebase (SIMPLE but TEDIOUS)
# We'll use this approach for safety
```

### Step 5: Interactive Rebase to Clean History
```bash
# Rebase from the first commit
git rebase -i --root

# In the editor, mark commits to edit:
# Change 'pick' to 'edit' for commits with secrets
# Save and close

# For each commit marked as 'edit':
# 1. Amend the commit with cleaned files
git commit --amend --no-edit
# 2. Continue rebase
git rebase --continue
```

### Step 6: Force Push to GitHub (DESTRUCTIVE)
```bash
# WARNING: This will overwrite GitHub history
# Make sure team members are aware!

# Force push to main branch
git push origin main --force

# Force push all branches
git push origin --all --force

# Force push all tags
git push origin --tags --force
```

### Step 7: Verify Cleanup
```bash
# Check commit history
git log --oneline

# Verify no secrets in history
git log -p | grep -i "mongodb://localhost"
git log -p | grep -i "27017"

# Check GitHub repository
# Visit: https://github.com/AyoubEsprit/Projet-NestJs
```

### Step 8: Rotate Credentials (CRITICAL)
```bash
# Even after cleanup, assume credentials are compromised
# 1. Change MongoDB password
# 2. Update .env with new credentials
# 3. Never reuse exposed credentials
```

---

## 🚨 ALTERNATIVE: Nuclear Option (Start Fresh)

If the above is too complex, start with a clean repository:

```bash
# 1. Remove Git history
rm -rf .git

# 2. Initialize new repository
git init

# 3. Add all files (with .env already in .gitignore)
git add .

# 4. Create initial commit
git commit -m "🎉 Initial commit with secure configuration

- Environment variables for sensitive data
- MongoDB credentials in .env (not committed)
- Proper security practices implemented"

# 5. Add remote
git remote add origin https://github.com/AyoubEsprit/Projet-NestJs.git

# 6. Force push
git push origin main --force
```

---

## ✅ Post-Cleanup Checklist

- [ ] Git history rewritten
- [ ] Force pushed to GitHub
- [ ] Verified no secrets in `git log -p`
- [ ] `.env` file NOT in repository
- [ ] `.env.example` committed
- [ ] MongoDB credentials rotated
- [ ] Team members notified
- [ ] Documentation updated
- [ ] CI/CD updated with new env vars

---

## 📞 Team Communication Template

```
🚨 URGENT: Git History Rewrite

We've rewritten the Git history to remove exposed secrets.

ACTION REQUIRED:
1. Backup your local changes
2. Delete your local repository
3. Clone fresh from GitHub:
   git clone https://github.com/AyoubEsprit/Projet-NestJs.git
4. Copy .env.example to .env
5. Update .env with your local settings

DO NOT:
- Try to pull/merge old branches
- Push old commits
- Reuse exposed credentials

Questions? Contact the team lead.
```

---

## 🔒 Prevention for Future

### Pre-commit Hook
Create `.git/hooks/pre-commit`:
```bash
#!/bin/sh
# Check for secrets before commit
if git diff --cached | grep -i "mongodb://"; then
    echo "❌ ERROR: MongoDB URL detected in commit"
    exit 1
fi
```

### GitHub Secret Scanning
- Enable GitHub secret scanning
- Enable push protection
- Review security alerts regularly

---

**⚠️ REMEMBER: Once secrets are on GitHub, consider them compromised forever!**

