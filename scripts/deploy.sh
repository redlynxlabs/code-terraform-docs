#!/usr/bin/env bash
# Manual deploy for terraform.wiki: build locally, replace the remote docroot.
# Run from the repo root (Git Bash on Windows works): npm run deploy
# Prereq: SSH key access to the server; DEST is the path your Caddy container mounts.
set -euo pipefail

HOST="your.server.example"     # VPS hostname or IP
USER="deploy"                  # SSH user
DEST="/srv/terraform-wiki"     # host path mounted into the Caddy container

npm run build

echo "clearing $USER@$HOST:$DEST"
ssh "$USER@$HOST" "mkdir -p '$DEST' && find '$DEST' -mindepth 1 -delete"

echo "uploading dist/"
tar -C dist -czf - . | ssh "$USER@$HOST" "tar -xzf - -C '$DEST'"

echo "deployed: https://terraform.wiki"
