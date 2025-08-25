# Use Bun as base image
FROM oven/bun:1 as base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
COPY packages/ui/package.json ./packages/ui/
COPY packages/utils/package.json ./packages/utils/
COPY apps/landing/package.json ./apps/landing/
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-slim as production
WORKDIR /app

# Copy built application
COPY --from=base /app/apps/landing/.next ./apps/landing/.next
COPY --from=base /app/apps/landing/public ./apps/landing/public
COPY --from=base /app/apps/landing/package.json ./apps/landing/

# Install only production dependencies
WORKDIR /app/apps/landing
RUN bun install --production --frozen-lockfile

# Expose port
EXPOSE 3000

# Start the application
CMD ["bun", "start"]
