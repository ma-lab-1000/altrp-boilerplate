# Используем официальный Node.js образ
FROM node:18-alpine AS base

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем bun
RUN npm install -g bun

# Копируем корневые файлы зависимостей
COPY package*.json ./
COPY bun.lockb ./

# Копируем workspace пакеты
COPY packages/ ./packages/
COPY apps/landing/package.json ./apps/landing/

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

# Копируем исходный код landing приложения
COPY apps/landing/ ./apps/landing/

# Собираем приложение
RUN bun run --cwd apps/landing build

# Создаем production образ
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Создаем пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем собранное приложение
COPY --from=base /app/apps/landing/.next/standalone ./
COPY --from=base /app/apps/landing/.next/static ./apps/landing/.next/static
COPY --from=base /app/apps/landing/public ./apps/landing/public

# Устанавливаем права
RUN chown -R nextjs:nodejs /app
USER nextjs

# Открываем порт
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Запускаем приложение
CMD ["node", "apps/landing/server.js"]
