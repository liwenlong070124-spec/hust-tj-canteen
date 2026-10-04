# ECS 部署指南

> Created: 2026-10-04
> Updated: 2026-10-04

目标地址：`https://lwl.husteread.com/canteen/`

## 服务器一次性准备

以下操作在 ECS 上执行，路径可以按服务器实际约定调整：

```bash
sudo mkdir -p /var/www/hust-tj-canteen
sudo useradd --system --home /var/www/hust-tj-canteen --shell /usr/sbin/nologin canteen || true
sudo chown -R canteen:canteen /var/www/hust-tj-canteen
```

本项目是静态导出，不需要在 ECS 上安装 Node.js 或 pnpm；服务器只需要 Nginx 和 HTTPS。静态文件放在 `/var/www/hust-tj-canteen/out`。

## Nginx 路由

将 `/canteen/` 映射到静态导出的目录。因为 Next 配置了 `basePath: '/canteen'`，资源和详情链接会自动带上前缀。

版本化配置见 [`deploy/nginx/lwl.husteread.com.conf`](../../deploy/nginx/lwl.husteread.com.conf)。

用 Certbot/宝塔面板给 `lwl.husteread.com` 申请证书后，将同样的两个 `location` 放入 443 server，并把 80 server 改为 301 跳转 HTTPS。

## 本地发布

本地执行：

```bash
bash scripts/deploy/ssh-deploy.sh
```

脚本会依次运行安装、lint、typecheck、build 和产物检查，再通过 `ssh MyECS`/`rsync` 将 `out/` 同步到 ECS。Nginx 读取该目录，不需要服务重启。

## 反向代理注意事项

主站已经占用根路径时，代理需要保留根路径原个人站点，再单独挂载 `/canteen/`。不要把 `out/` 直接覆盖个人站点根目录。

当前 v0.1 使用 `trailingSlash: true`，详情路由可直接映射到 `/canteen/canteens/<slug>/index.html`。
