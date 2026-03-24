# Netlify Auto-Deployment Setup

## Fast Automatic Deployment for HouseGramX

Netlify обеспечивает **быструю сборку и развертывание** с автоматическим CI/CD.

### Преимущества Netlify:
- ⚡ **Быстрая сборка** - ~2-3 минуты
- 🌍 **Глобальная CDN** - автоматическое распределение
- 🔄 **Автоматическое развертывание** - при каждом push в main
- 📊 **Preview deployments** - для каждого PR
- 💰 **Бесплатно** - без ограничений на free плане

### Настройка Netlify

1. Перейди на https://app.netlify.com
2. Нажми "Add new site" → "Import an existing project"
3. Выбери GitHub и авторизуй
4. Выбери репозиторий `HouseGramX`
5. Настройки:
   - **Build command:** `npx webpack --mode production`
   - **Publish directory:** `dist`
   - **Node version:** 22.6
6. Нажми "Deploy site"

### Автоматическое развертывание

После подключения GitHub:
- При каждом push в main → автоматическая сборка
- При каждом PR → preview deployment
- Статус видно в GitHub Actions

### Скорость развертывания:
- Сборка: ~2-3 минуты
- Развертывание: ~30 секунд
- **Итого: ~3-4 минуты от push до live**

### Мониторинг
- Смотри статус на https://app.netlify.com
- Смотри логи в разделе "Deploys"
- Смотри статус в GitHub (checks)

### netlify.toml
Конфигурация уже готова в `netlify.toml`:
- Build command: `npx webpack --mode production`
- Publish directory: `dist`
- Redirects для SPA
- Cache headers для оптимизации
