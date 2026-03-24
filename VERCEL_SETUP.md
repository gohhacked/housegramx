# Vercel Auto-Deployment Setup

## Fastest Automatic Deployment for HouseGramX

Vercel обеспечивает **самую быструю сборку и развертывание** для фронтенд приложений.

### Преимущества Vercel:
- ⚡ **Самая быстрая сборка** - sub-100ms TTFB
- 🌍 **Глобальная CDN** - автоматическое распределение по всему миру
- 🔄 **Автоматическое развертывание** - при каждом push в main
- 📊 **Preview deployments** - для каждого PR
- 🚀 **Edge Functions** - для максимальной производительности

### Настройка GitHub Actions

1. Перейди на https://vercel.com/dashboard
2. Создай новый проект или подключи существующий
3. Получи токены:
   - `VERCEL_TOKEN` - Personal Access Token
   - `VERCEL_ORG_ID` - Organization ID
   - `VERCEL_PROJECT_ID` - Project ID

4. Добавь секреты в GitHub:
   - Перейди в Settings → Secrets and variables → Actions
   - Добавь три переменные выше

5. Готово! Теперь при каждом push в main:
   - GitHub Actions автоматически запустится
   - Vercel CLI выполнит сборку
   - Приложение развернется на production

### Скорость развертывания:
- Сборка: ~2-3 минуты
- Развертывание: ~30 секунд
- **Итого: ~3-4 минуты от push до live**

### Мониторинг
- Смотри статус в GitHub Actions tab
- Смотри логи на https://vercel.com/dashboard
