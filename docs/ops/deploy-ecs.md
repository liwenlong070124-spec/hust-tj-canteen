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

用 Certbot/宝塔面板给 `lwl.husteread.com` 申请证书后，使用版本化配置中的全部 `/canteen` location，并把 80 server 改为 301 跳转 HTTPS。裸路径 `/canteen` 必须跳转到 `/canteen/`；不存在的路由应返回 HTTP 404 并展示 `out/404.html`，不能回退到首页。

修改 Nginx 配置时，先备份当前站点配置，再应用改动；运行 `sudo nginx -t` 成功后才执行 `sudo systemctl reload nginx`。配置检查失败时恢复备份。日常发布脚本只同步静态文件，不覆盖 Nginx 或根目录个人网站。

## 本地发布

本地执行：

```bash
bash scripts/deploy/ssh-deploy.sh
```

脚本会依次运行安装、lint、typecheck、build、产物检查和回归测试，再通过 `ssh MyECS`/`rsync` 将 `out/` 同步到 ECS。测试需要本地 Python 3.9+。Nginx 读取该目录，不需要服务重启。

## 反向代理注意事项

主站已经占用根路径时，代理需要保留根路径原个人站点，再单独挂载 `/canteen/`。不要把 `out/` 直接覆盖个人站点根目录。

当前 v0.1 使用 `trailingSlash: true`，详情路由可直接映射到 `/canteen/canteens/<slug>/index.html`。
