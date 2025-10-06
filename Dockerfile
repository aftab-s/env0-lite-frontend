# Bagel Frontend Docker Image
# Multi-stage build for optimized production image

# Build stage
FROM node:20-alpine AS builder

# Install security updates and necessary packages
RUN apk update && apk upgrade && apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies with security audit
RUN npm ci --only=production=false && \
    npm audit --audit-level=moderate || true && \
    npm cache clean --force

# Copy source code
COPY . .

# Build the Next.js application for production
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

# Install security updates and curl for health checks
RUN apk update && apk upgrade && apk add --no-cache curl && \
    rm -rf /var/cache/apk/*

WORKDIR /app

# Create non-root user with specific UID/GID for security
RUN addgroup -g 1001 -S nextjs && \
    adduser -S nextjs -u 1001 -G nextjs -h /app

# Copy built application from builder stage with proper ownership
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

# Set proper permissions
RUN chmod -R 755 /app && \
    chown -R nextjs:nextjs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables for production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS="--max-old-space-size=512"

# Health check with better error handling
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || curl -f http://localhost:3000/ || exit 1

# Start the application
CMD ["node", "server.js"]