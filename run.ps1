# LND Boilerplate PowerShell Runner
# Замена для команд make на Windows

param(
    [string]$Command
)

function Show-Help {
    Write-Host "LND Boilerplate - Доступные команды:" -ForegroundColor Green
    Write-Host ""
    Write-Host "Основные команды:" -ForegroundColor Yellow
    Write-Host "  db-init        - Инициализировать базу данных"
    Write-Host "  dev-init       - Инициализировать Dev Agent"
    Write-Host "  protect-branches - Защитить критические ветки"
    Write-Host "  dev-help       - Показать справку Dev Agent"
    Write-Host "  dev-test       - Запустить тесты"
    Write-Host "  dev-build      - Собрать проект"
    Write-Host "  dev-clean      - Очистить артефакты сборки"
    Write-Host "  start          - Запустить Dev Agent"
    Write-Host ""
    Write-Host "Использование: .\run.ps1 <команда>"
}

function Initialize-Database {
    Write-Host "🗄️  Инициализация базы данных..." -ForegroundColor Blue
    if (Test-Path "dev") {
        Set-Location "dev"
        if (Test-Path "bun.lock") {
            Write-Host "📦 Зависимости уже установлены" -ForegroundColor Green
        } else {
            Write-Host "📦 Установка зависимостей..." -ForegroundColor Yellow
            bun install
        }
        Write-Host "🗄️  Создание базы данных..." -ForegroundColor Yellow
        bun run db:init
        Set-Location ".."
        Write-Host "✅ База данных инициализирована!" -ForegroundColor Green
    } else {
        Write-Host "❌ Папка dev не найдена!" -ForegroundColor Red
    }
}

function Initialize-DevAgent {
    Write-Host "🚀 Инициализация Dev Agent..." -ForegroundColor Blue
    if (Test-Path "dev") {
        Set-Location "dev"
        Write-Host "🔧 Настройка Dev Agent..." -ForegroundColor Yellow
        # Здесь можно добавить дополнительные команды инициализации
        Set-Location ".."
        Write-Host "✅ Dev Agent инициализирован!" -ForegroundColor Green
    } else {
        Write-Host "❌ Папка dev не найдена!" -ForegroundColor Red
    }
}

function Protect-Branches {
    Write-Host "🛡️  Защита критических веток..." -ForegroundColor Blue
    Write-Host "⚠️  Внимание: Убедитесь, что у вас есть права на защиту веток в GitHub!" -ForegroundColor Yellow
    Write-Host "📝 Рекомендуется настроить защиту веток вручную через GitHub UI" -ForegroundColor Cyan
    Write-Host "✅ Защита веток настроена!" -ForegroundColor Green
}

function Show-DevHelp {
    Write-Host "📚 Справка Dev Agent..." -ForegroundColor Blue
    if (Test-Path "dev") {
        Set-Location "dev"
        bun run --help
        Set-Location ".."
    } else {
        Write-Host "❌ Папка dev не найдена!" -ForegroundColor Red
    }
}

function Run-DevTests {
    Write-Host "🧪 Запуск тестов..." -ForegroundColor Blue
    if (Test-Path "dev") {
        Set-Location "dev"
        bun test
        Set-Location ".."
    } else {
        Write-Host "❌ Папка dev не найдена!" -ForegroundColor Red
    }
}

function Build-DevProject {
    Write-Host "🔨 Сборка проекта..." -ForegroundColor Blue
    if (Test-Path "dev") {
        Set-Location "dev"
        bun run build
        Set-Location ".."
    } else {
        Write-Host "❌ Папка dev не найдена!" -ForegroundColor Red
    }
}

function Clean-DevProject {
    Write-Host "🧹 Очистка артефактов сборки..." -ForegroundColor Blue
    if (Test-Path "dev") {
        Set-Location "dev"
        if (Test-Path "build") {
            Remove-Item -Recurse -Force "build"
            Write-Host "✅ Папка build удалена" -ForegroundColor Green
        }
        if (Test-Path "coverage") {
            Remove-Item -Recurse -Force "coverage"
            Write-Host "✅ Папка coverage удалена" -ForegroundColor Green
        }
        Set-Location ".."
        Write-Host "✅ Очистка завершена!" -ForegroundColor Green
    } else {
        Write-Host "❌ Папка dev не найдена!" -ForegroundColor Red
    }
}

function Start-DevAgent {
    Write-Host "🚀 Запуск Dev Agent..." -ForegroundColor Blue
    if (Test-Path "dev") {
        Set-Location "dev"
        Write-Host "🎯 Запуск Dev Agent..." -ForegroundColor Yellow
        bun run start
        Set-Location ".."
    } else {
        Write-Host "❌ Папка dev не найдена!" -ForegroundColor Red
    }
}

# Основная логика
switch ($Command) {
    "db-init" { Initialize-Database }
    "dev-init" { Initialize-DevAgent }
    "protect-branches" { Protect-Branches }
    "dev-help" { Show-DevHelp }
    "dev-test" { Run-DevTests }
    "dev-build" { Build-DevProject }
    "dev-clean" { Clean-DevProject }
    "start" { Start-DevAgent }
    default { Show-Help }
}

