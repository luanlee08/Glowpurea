# =========================
# 1. BUILD STAGE
# =========================
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Ensure Corepack / pnpm is available (Next may call pnpm to fetch SWC)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies (CI/CD)
RUN npm ci

# Copy source code
COPY . .

# Build Next.js
RUN npm run build


# =========================
# 2. RUN STAGE
# =========================
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production

# Copy only needed files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Expose Next.js port
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "start"]
