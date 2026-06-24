# GitHub Commands Reference

## Setup

```bash
# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## Clone & Init

```bash
# Clone this repository
git clone https://github.com/Alcrro/airbnb.git

# Clone into current directory
git clone https://github.com/Alcrro/airbnb.git .

# Initialize a new repo
git init
```

---

## Branch

```bash
# List branches
git branch

# Create a new branch
git branch feature/my-feature

# Switch to a branch
git checkout feature/my-feature

# Create and switch in one step
git checkout -b feature/my-feature

# Delete a branch (local)
git branch -d feature/my-feature

# Delete a branch (remote)
git push origin --delete feature/my-feature
```

---

## Stage & Commit

```bash
# Check status
git status

# Stage a specific file
git add src/components/MyComponent.tsx

# Stage all changes
git add .

# Commit with a message
git commit -m "feat: add listing card component"

# Stage and commit tracked files
git commit -am "fix: correct price calculation"
```

---

## Push & Pull

```bash
# Push current branch to remote
git push origin feature/my-feature

# Push and set upstream tracking
git push -u origin feature/my-feature

# Pull latest changes
git pull

# Pull with rebase (cleaner history)
git pull --rebase origin main
```

---

## Merge & Rebase

```bash
# Merge a branch into current branch
git merge feature/my-feature

# Rebase current branch onto main
git rebase main

# Abort a rebase in progress
git rebase --abort
```

---

## Stash

```bash
# Stash uncommitted changes
git stash

# List stashes
git stash list

# Apply most recent stash
git stash pop

# Apply a specific stash
git stash apply stash@{2}
```

---

## Log & Diff

```bash
# View commit history
git log --oneline

# View changes not yet staged
git diff

# View staged changes
git diff --staged

# Compare two branches
git diff main..feature/my-feature
```

---

## Remote

```bash
# List remotes
git remote -v

# Add a remote
git remote add origin https://github.com/Alcrro/airbnb.git

# Change remote URL
git remote set-url origin https://github.com/Alcrro/airbnb.git
```

---

## Undo

```bash
# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (keep changes unstaged)
git reset HEAD~1

# Discard changes in a file
git checkout -- src/components/MyComponent.tsx

# Revert a commit (safe, creates new commit)
git revert <commit-hash>
```

---

## Tags

```bash
# Create a tag
git tag v1.0.0

# Push tags to remote
git push origin --tags

# Delete a tag
git tag -d v1.0.0
```
