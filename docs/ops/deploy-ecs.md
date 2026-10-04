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

准备 Node.js 22.11.0、pnpm 以及 Nginx/Caddy 反向代理。站点运行端口建议使用 `3107`，由 `lwl.husteread.com/canteen/` 的代理规则转发到 `127.0.0.1:3107`。

## systemd 服务

将以下内容保存为 `/etc/systemd/system/hust-tj-canteen.service`：

```ini
[Unit]
Description=HUST TJMU Canteen Atlas
After=network.target

[Service]
Type=simple
User=canteen
WorkingDirectory=/var/www/hust-tj-canteen
Environment=NODE_ENV=production
Environment=PORT=3107
ExecStart=/usr/bin/pnpm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

然后执行：

```bash
sudo systemctl daemon-reload
sudo systemctl enable hust-tj-canteen.service
sudo systemctl start hust-tj-canteen.service
```

## 本地发布

本地执行：

```bash
bash scripts/deploy/ssh-deploy.sh
```

脚本会依次运行安装、lint、typecheck、build 和产物检查，再通过 `ssh MyECS`/`rsync` 同步 `.next/`、`public/` 和配置，最后重启 systemd 服务。

## 反向代理注意事项

主站已经占用根路径时，代理需要把 `/canteen/` 的请求转发到站点端口，并保留前缀。Next 静态资源路径默认是 `/_next/...`，如果代理使用子路径，建议在 Nginx/Caddy 中同时把 `/canteen/_next/` 映射到应用的 `/_next/`，或者后续设置 `basePath: '/canteen'` 并重新构建。

当前 v0.1 使用 `trailingSlash: true`，详情路由可直接映射到 `/canteen/canteens/<slug>/index.html`。

