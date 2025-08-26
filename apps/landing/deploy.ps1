# Скрипт развертывания для Coolify
Write-Host "🚀 Запуск развертывания landing приложения..." -ForegroundColor Green

# Проверяем наличие Docker
try {
    docker --version | Out-Null
    Write-Host "✅ Docker найден" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker не найден. Установите Docker Desktop" -ForegroundColor Red
    exit 1
}

# Собираем Docker образ
Write-Host "🔨 Сборка Docker образа..." -ForegroundColor Yellow
docker build -t landing-app .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Образ успешно собран" -ForegroundColor Green
    
    # Останавливаем существующий контейнер если есть
    docker stop landing-app 2>$null
    docker rm landing-app 2>$null
    
    # Запускаем новый контейнер
    Write-Host "🚀 Запуск контейнера..." -ForegroundColor Yellow
    docker run -d -p 3000:3000 --name landing-app --restart unless-stopped landing-app
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Приложение запущено!" -ForegroundColor Green
        Write-Host "🌐 Доступно по адресу: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "📊 Health check: http://localhost:3000/api/health" -ForegroundColor Cyan
        
        # Показываем статус
        Start-Sleep -Seconds 2
        docker ps --filter name=landing-app
    } else {
        Write-Host "❌ Ошибка запуска контейнера" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Ошибка сборки образа" -ForegroundColor Red
}

Write-Host "`n💡 Для развертывания на Coolify:" -ForegroundColor Blue
Write-Host "   1. Запушьте изменения в Git" -ForegroundColor White
Write-Host "   2. В Coolify создайте новый проект" -ForegroundColor White
Write-Host "   3. Укажите Root Directory: apps/landing" -ForegroundColor White
Write-Host "   4. Выберите Build Pack: Dockerfile" -ForegroundColor White
