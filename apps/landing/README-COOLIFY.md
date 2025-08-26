# 🚀 Развертывание на Coolify

## Быстрый старт

### 1. Подготовка
- Убедитесь, что все изменения запушены в Git
- Coolify сервер настроен и доступен

### 2. Создание проекта в Coolify
1. **New Project** → **Application**
2. **Source**: Ваш Git репозиторий
3. **Branch**: `main` (или ваша основная ветка)
4. **Build Pack**: `Dockerfile`
5. **Root Directory**: `apps/landing`

### 3. Настройка переменных
```
NODE_ENV=production
PORT=3000
```

### 4. Настройка портов
- **Port**: `3000`
- **Expose Port**: `3000`

### 5. Запуск
Нажмите **Deploy** и дождитесь завершения сборки.

## 🔧 Локальное тестирование

### Windows (PowerShell)
```powershell
.\deploy.ps1
```

### Linux/macOS
```bash
chmod +x deploy.sh
./deploy.sh
```

### Docker Compose
```bash
docker-compose up -d --build
```

## 📊 Проверка работоспособности

- **Главная страница**: `http://your-domain:3000`
- **Health Check**: `http://your-domain:3000/api/health`
- **Логи**: В Coolify dashboard

## 🐛 Troubleshooting

### Ошибка сборки
- Проверьте версию Node.js (18+)
- Убедитесь, что все зависимости установлены
- Проверьте .dockerignore файл

### Приложение недоступно
- Проверьте настройки портов
- Убедитесь, что firewall разрешает трафик
- Проверьте DNS настройки

## 📁 Структура файлов

```
apps/landing/
├── Dockerfile          # Docker образ
├── docker-compose.yml  # Docker Compose
├── .dockerignore       # Исключения для Docker
├── deploy.ps1         # Скрипт для Windows
├── deploy.sh          # Скрипт для Linux/macOS
├── DEPLOYMENT.md      # Подробная инструкция
└── README-COOLIFY.md  # Эта инструкция
```

## 🔄 Обновление

1. Запушьте изменения в Git
2. В Coolify нажмите **Redeploy**
3. Или настройте автоматическое развертывание

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи в Coolify dashboard
2. Убедитесь, что все файлы созданы корректно
3. Проверьте настройки Docker и портов
