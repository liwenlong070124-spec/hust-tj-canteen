#!/usr/bin/env bash
set -euo pipefail

# Build locally and sync the static export to MyECS.
# Optional env vars: DEPLOY_HOST (default MyECS), DEPLOY_PATH.
DEPLOY_HOST="${DEPLOY_HOST:-MyECS}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/hust-tj-canteen}"

pnpm install --frozen-lockfile
pnpm lint
pnpm tsc
pnpm build
pnpm check:output
pnpm test

ssh "$DEPLOY_HOST" "mkdir -p '$DEPLOY_PATH/out'"
rsync -az --delete out/ "$DEPLOY_HOST:$DEPLOY_PATH/out/"

echo "Deployed to $DEPLOY_HOST:$DEPLOY_PATH"
