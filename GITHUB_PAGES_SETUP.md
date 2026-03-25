# GitHub Pages - Автоматическое развертывание

## Самый простой хостинг для HouseGramX

### Преимущества:
- ✅ **Бесплатно** - навсегда
- ✅ **Автоматически** - при каждом push
- ✅ **Быстро** - 2-3 минуты сборка
- ✅ **Просто** - никаких настроек

### Настройка (1 минута):

1. Перейди на https://github.com/GohHacked/HouseGramX/settings/pages

2. В разделе "Build and deployment":
   - Source: выбери **GitHub Actions**

3. Готово! GitHub Actions уже настроен в `.github/workflows/github-pages.yml`

### Как работает:

1. Делаешь `git push`
2. GitHub Actions автоматически:
   - Устанавливает зависимости
   - Собирает проект
   - Развертывает на GitHub Pages
3. Сайт доступен по адресу: **https://gohhacked.github.io/HouseGramX/**

### Скорость:
- Сборка: ~2-3 минуты
- Развертывание: ~30 секунд
- **Итого: ~3-4 минуты от push до live**

### Мониторинг:
- Смотри статус в GitHub Actions: https://github.com/GohHacked/HouseGramX/actions
- Зеленая галочка = успешно развернуто
- Красный крестик = ошибка сборки

### Преимущества перед другими:
- Не нужно регистрироваться на других сервисах
- Все в одном месте с кодом
- Unlimited bandwidth
- Бесплатный SSL
