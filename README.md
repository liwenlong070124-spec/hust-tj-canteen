# hust-tj-canteen

> 同济食光：华中科技大学同济医学院的轻量美食图鉴

## 项目简介

这是一个面向同济医学院师生的本地美食图鉴。它把食堂、窗口、代表菜、参考价格和位置提示整理成可以快速浏览的“吃饭导航”，并提供今日随机推荐与本地个人偏好设置。

### 核心能力

- **美食图鉴**：按推荐、口味和预算浏览窗口与菜品
- **吃什么**：带动效的随机推荐器，解决下一顿吃什么
- **我的**：本地保存昵称、口味偏好和收藏数量，不接入真实登录
- **Playground**：集中展示颜色、字体、组件、动效和交互规范
- **本地注册表**：不依赖云端数据库，编辑数据即可完成后续内容维护

## 技术栈

| 类别 | 技术 | 版本 |
|---|---|---|
| 框架 | Next.js App Router | 16.2 |
| UI | React | 19.2 |
| 语言 | TypeScript | strict |
| 样式 | Tailwind CSS + CSS tokens | v4 |
| 构建 | Static Export | `out/` |
| 部署 | 自有 ECS | `ssh MyECS` |

## 快速开始

```bash
pnpm install
pnpm dev
```

打开 [http://localhost:3000/canteen/](http://localhost:3000/canteen/)。

线上挂载在 `/canteen` 子路径；先运行 `pnpm build`，再运行 `pnpm preview`（需要 Python 3.9+），访问 [http://localhost:4173/canteen/](http://localhost:4173/canteen/)。`pnpm start` 同样用于静态预览，不启动 Next 服务端。

## 验收

```bash
pnpm lint
pnpm tsc
pnpm build
pnpm check:output
pnpm test
```

## 部署

目标地址：`https://lwl.husteread.com/canteen/`

部署脚本会构建静态站并通过 `ssh MyECS` 连接服务器，将 `out/` 同步到 `/var/www/hust-tj-canteen/out`。首次部署前请按 [ECS 部署说明](./docs/ops/deploy-ecs.md) 在服务器准备 Nginx 和 HTTPS。

```bash
bash scripts/deploy/ssh-deploy.sh
```

## 资料说明

当前数据是 v0.1 编辑版：食堂名称、活动服务信息与公开可检索的窗口线索来自公开页面；菜单价格与营业时段以“参考/待核验”呈现，避免把会变化的价格误认为官方定价。来源与维护方式见 [数据注册表说明](./docs/specs/data-registry.md)。

## License

MIT
