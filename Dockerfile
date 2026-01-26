# =========================
# 1. BUILD STAGE
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (CHUẨN cho CI/CD)
RUN npm ci

# Copy source code
COPY . .

# Build Next.js
RUN npm run build


# =========================
# 2. RUN STAGE
# =========================
FROM node:20-alpine

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
