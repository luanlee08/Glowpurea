# =========================
# 1. BUILD STAGE
# =========================
FROM node:20-slim AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Next.js (webpack)
RUN npm run build


# =========================
# 2. RUN STAGE
# =========================
FROM node:20-slim

WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
# COPY --from=builder /app/.env.production ./.env.production  # nếu có

EXPOSE 3000
CMD ["npm", "run", "start"]
