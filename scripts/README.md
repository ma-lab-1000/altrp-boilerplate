# Scripts

Эта папка содержит скрипты для работы с проектом.

## Файлы

- `update-dev.ps1` - PowerShell скрипт для обновления dev-agent subtree
- `update-dev.sh` - Bash скрипт для обновления dev-agent subtree

## Использование

### Обновление dev-agent subtree
```bash
# Через Makefile (рекомендуется)
make dev-update

# Вручную
./scripts/update-dev.ps1  # Windows
./scripts/update-dev.sh   # Linux/Mac
```

## Важно

- Скрипты только получают обновления, не отправляют изменения
- Все изменения в dev-agent должны идти через issues и PR
