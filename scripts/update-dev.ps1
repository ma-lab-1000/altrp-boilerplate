# Скрипт для получения обновлений из dev-agent subtree
# ВНИМАНИЕ: Этот скрипт только получает обновления, не отправляет коммиты в dev-agent

Write-Host "🔄 Получение обновлений из dev-agent..." -ForegroundColor Yellow

# Получаем последние изменения из dev-agent
git subtree pull --prefix=dev https://github.com/GTFB/dev-agent.git main --squash

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Обновления получены успешно!" -ForegroundColor Green
    Write-Host "📝 Теперь можно создать коммит с обновлениями:" -ForegroundColor Cyan
    Write-Host "   git add ." -ForegroundColor White
    Write-Host "   git commit -m 'Update dev-agent subtree'" -ForegroundColor White
    Write-Host ""
    Write-Host "⚠️  ВАЖНО: Не используйте git subtree push для отправки изменений в dev-agent!" -ForegroundColor Red
    Write-Host "   Все изменения должны идти через issues и pull requests в dev-agent репозитории." -ForegroundColor Red
} else {
    Write-Host "❌ Ошибка при получении обновлений!" -ForegroundColor Red
}
