#!/usr/bin/env bash
set -euo pipefail

# Build locally, sync the standalone app to MyECS, and restart the systemd unit.
# Optional env vars: DEPLOY_HOST (default MyECS), DEPLOY_PATH, SERVICE_NAME.
DEPLOY_HOST="${DEPLOY_HOST:-MyECS}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/hust-tj-canteen}"
SERVICE_NAME="${SERVICE_NAME:-hust-tj-canteen.service}"

pnpm install --frozen-lockfile
pnpm lint
pnpm tsc
pnpm build
pnpm check:output

ssh "$DEPLOY_HOST" "mkdir -p '$DEPLOY_PATH/.next' '$DEPLOY_PATH/public'"
rsync -az --delete .next/ "$DEPLOY_HOST:$DEPLOY_PATH/.next/"
rsync -az --delete public/ "$DEPLOY_HOST:$DEPLOY_PATH/public/"
rsync -az package.json next.config.ts "$DEPLOY_HOST:$DEPLOY_PATH/"
ssh "$DEPLOY_HOST" "sudo systemctl restart '$SERVICE_NAME'"

echo "Deployed to $DEPLOY_HOST:$DEPLOY_PATH"
