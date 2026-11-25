#!/usr/bin/env bash
set -euo pipefail

# 构建静态站点并推送到 gh-pages 分支（用于 GitHub Pages 发布）
pnpm build

REMOTE_URL="$(git remote get-url origin)"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

cp -R dist/. "$TMP_DIR/"
cd "$TMP_DIR"

git init -b gh-pages
git add -A
git commit -m "chore: 部署个人主页静态产物"
git push --force "$REMOTE_URL" gh-pages:gh-pages
