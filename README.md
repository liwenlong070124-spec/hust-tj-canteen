# hust-tj-canteen

> 同济食光：华中科技大学同济医学院的轻量美食图鉴

## 项目简介

这是一个面向同济医学院师生的本地美食图鉴。它把食堂、窗口、代表菜、参考价格和位置提示整理成可以快速浏览的“吃饭导航”，并提供今日随机推荐与本地个人偏好设置。

### 核心能力

- **美食图鉴**：手机双列浏览、搜索筛选、独立菜品详情与收藏列表
- **食堂图谱**：6 个公开列名食堂 + 独立的历史线索，逐条附来源
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

当前版本为 v0.2.0。食堂名称来自公开采购公告与学院报道；窗口关联、菜品和价格是编辑示例，不是现售菜单。精确位置、营业时间与历史名称均标注待核验，不伪造坐标或步行距离。来源与维护方式见 [数据注册表说明](./docs/specs/data-registry.md)。

11 张菜品图片分别生成并保存在 `public/images/foods/`，统一标明 AI 示意、非食堂实拍。图片提示词、压缩和替换步骤见 [素材维护记录](./docs/design/food-assets-v2.md)。移动端布局与验收见 [v0.2 改版说明](./docs/designs/mobile-v2.md)。

## License

MIT
