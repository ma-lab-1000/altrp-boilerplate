# Dev Subtree - Инструкции по работе

## Что это такое

Папка `dev/` - это subtree из репозитория [dev-agent](https://github.com/GTFB/dev-agent.git). Это позволяет получать обновления из dev-agent, но **НЕ отправлять** туда изменения.

## Как получить обновления

### Windows (PowerShell)
```powershell
.\update-dev.ps1
```

### Linux/Mac (Bash)
```bash
./update-dev.sh
```

### Вручную
```bash
git subtree pull --prefix=dev https://github.com/GTFB/dev-agent.git main --squash
```

## ⚠️ ВАЖНО - Что НЕЛЬЗЯ делать

❌ **НЕ используйте:**
```bash
git subtree push --prefix=dev https://github.com/GTFB/dev-agent.git main
```

❌ **НЕ делайте прямые коммиты в папку dev/**

## ✅ Правильный workflow

1. **Получить обновления:**
   ```bash
   .\update-dev.ps1  # или ./update-dev.sh
   ```

2. **Закоммитить обновления:**
   ```bash
   git add .
   git commit -m "Update dev-agent subtree"
   ```

3. **Отправить в свой репозиторий:**
   ```bash
   git push origin develop
   ```

## 🔧 Как внести изменения в dev-agent

Если нужно что-то изменить в dev-agent:

1. **Создайте issue** в [dev-agent репозитории](https://github.com/GTFB/dev-agent/issues)
2. **Создайте pull request** с вашими изменениями
3. **Дождитесь merge** в dev-agent
4. **Получите обновления** через subtree pull

## 📁 Структура

```
lnd-boilerplate/
├── dev/                    # ← dev-agent subtree (только для чтения)
├── update-dev.ps1         # PowerShell скрипт обновления
├── update-dev.sh          # Bash скрипт обновления
└── DEV_SUBTREE_README.md  # Этот файл
```

## 🚀 Автоматизация

Можно добавить в Makefile:

```makefile
update-dev:
	./update-dev.sh
	git add .
	git commit -m "Update dev-agent subtree"
```

## 🔍 Проверка статуса

```bash
# Посмотреть последний коммит subtree
git log --oneline --grep="Add 'dev'"

# Посмотреть изменения в dev папке
git log --oneline dev/
```
