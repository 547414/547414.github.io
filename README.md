# Crysu · 个人主页

- 在线访问：<https://547414.github.io>
- 个人主站：<https://crysu.com>
- 联系邮箱：`268zhb@gmail.com`

## 技术栈

- Vue 3 + TypeScript + Vite 6 + Tailwind CSS v4 + Lucide Icons
- 全部个人信息、技术栈、代表作品与工程信条集中在 [src/data/profile.ts](src/data/profile.ts) 维护

## 本地开发与构建

```bash
pnpm install
pnpm dev
pnpm build
```

## 部署说明

站点以纯静态产物托管于 GitHub Pages（`gh-pages` 分支根目录，访问地址 `https://547414.github.io`）。

修改内容后，运行 `pnpm deploy` 即可构建并将 `dist/` 目录推送至 `gh-pages` 分支更新线上页面；如需切换为 GitHub Actions 自动构建，可在仓库 Settings → Pages 中将 Source 切换为 GitHub Actions，并在网页端添加构建工作流。
