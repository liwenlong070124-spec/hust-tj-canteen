# scripts/

辅助脚本目录。

- `build/`：构建产物检查
- `deploy/`：ECS SSH 部署
- `setup/`：环境初始化预留
- `dev/static-preview.py`：将静态导出挂载到 `/canteen/`，与线上路由一致

`pnpm test` 使用 Node 内置测试运行器和 Python unittest，覆盖本地资料模型、子路径跳转、404、静态资源、价格标识和收藏按钮结构。先执行 `pnpm build`。
