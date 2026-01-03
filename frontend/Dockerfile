# ============================================
# Car Automotive Frontend - React/Vite Dockerfile
# ============================================
# Multi-stage build: Build with Node, Serve with Nginx

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production with Nginx
FROM nginx:alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Create required directories with proper permissions
RUN mkdir -p /var/cache/nginx /var/run /tmp && \
    chown -R appuser:appgroup /var/cache/nginx /var/run /tmp /usr/share/nginx/html && \
    chmod -R 755 /var/cache/nginx /var/run /tmp

# Update nginx.conf to run as non-root
RUN sed -i 's/user  nginx;/user  appuser;/' /etc/nginx/nginx.conf && \
    sed -i 's|/var/run/nginx.pid|/tmp/nginx.pid|' /etc/nginx/nginx.conf

# Expose port 3000 (non-privileged)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

