#!/bin/bash

# Скрипт развертывания для Coolify
echo "🚀 Запуск развертывания landing приложения..."

# Проверяем наличие Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не найден. Установите Docker"
    exit 1
fi

echo "✅ Docker найден"

# Собираем Docker образ
echo "🔨 Сборка Docker образа..."
docker build -t landing-app .

if [ $? -eq 0 ]; then
    echo "✅ Образ успешно собран"
    
    # Останавливаем существующий контейнер если есть
    docker stop landing-app 2>/dev/null
    docker rm landing-app 2>/dev/null
    
    # Запускаем новый контейнер
    echo "🚀 Запуск контейнера..."
    docker run -d -p 3000:3000 --name landing-app --restart unless-stopped landing-app
    
    if [ $? -eq 0 ]; then
        echo "✅ Приложение запущено!"
        echo "🌐 Доступно по адресу: http://localhost:3000"
        echo "📊 Health check: http://localhost:3000/api/health"
        
        # Показываем статус
        sleep 2
        docker ps --filter name=landing-app
    else
        echo "❌ Ошибка запуска контейнера"
    fi
else
    echo "❌ Ошибка сборки образа"
fi

echo ""
echo "💡 Для развертывания на Coolify:"
echo "   1. Запушьте изменения в Git"
echo "   2. В Coolify создайте новый проект"
echo "   3. Укажите Root Directory: apps/landing"
echo "   4. Выберите Build Pack: Dockerfile"
