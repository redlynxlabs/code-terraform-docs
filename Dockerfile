# terraform.wiki: build the Starlight site, serve it with a minimal Caddy.
#
#   docker build -t terraform-wiki .
#   docker run --rm -p 8080:80 terraform-wiki      # local smoke test
#
# Compose (next to your existing edge caddy service):
#
#   services:
#     wiki:
#       build: .
#       restart: unless-stopped
#
# Edge Caddyfile block then becomes:
#
#   terraform.wiki {
#       encode
#       reverse_proxy wiki:80
#   }
#
# If the edge Caddy lives in a DIFFERENT compose project, join them with a
# shared external network (docker network create web; add `networks: [web]`
# to both services and mark it external in both files).

# ---- Stage 1: build ---------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
# git powers Starlight's "last updated" page footers (repo history is in the
# build context on purpose; see .dockerignore)
RUN apk add --no-cache git

# dependency layer (cached until package files change)
COPY package.json package-lock.json ./
RUN npm ci --no-fund --no-audit

# content + config (".dockerignore" keeps junk out of the context)
COPY . .

# fail the image if a wiki link is broken or a dash sneaks in
RUN npm run check
RUN STRICT_LINKS=1 npm run build

# ---- Stage 2: serve ---------------------------------------------------------
FROM caddy:2-alpine
LABEL org.opencontainers.image.source="https://github.com/redlynxlabs/code-terraform-docs"
LABEL org.opencontainers.image.description="terraform.wiki: unofficial Code: Terraform field docs"

COPY infra/Caddyfile.container /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q -O /dev/null http://127.0.0.1:80/ || exit 1
