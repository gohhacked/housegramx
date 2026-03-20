# 🏠 HouseGramX

> **A Custom Telegram Web Client** | Кастомный веб-клиент Telegram

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-22.6+-green.svg)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://vercel.com)

---

## 📖 English

### 🎯 About

**HouseGramX** is a modern, lightweight web client for Telegram built on the foundation of the award-winning Telegram Web A, which won first prize 🥇 at the [Telegram Lightweight Client Contest](https://contest.com/javascript-web-3).

This project demonstrates cutting-edge web technologies and best practices:
- ⚡ **Zero Dependencies** - Built with custom [Teact](https://github.com/Ajaxy/teact) framework
- 🔐 **Secure** - Uses custom [GramJS](https://github.com/gram-js/gramjs) for MTProto implementation
- 🚀 **High Performance** - WebSockets, Web Workers, WebAssembly
- 💾 **Smart Caching** - Multi-level caching and PWA support
- 🎨 **Beautiful UI** - Advanced CSS/Canvas/SVG animations
- 🔊 **Rich Media** - Voice recording, streaming, and cryptography

### 🚀 Quick Start

#### Prerequisites
- Node.js 22.6+ or higher
- npm 10.8+ or higher

#### Installation

```bash
# Clone the repository
git clone https://github.com/GohHacked/HouseGramX.git
cd HouseGramX

# Copy environment file
cp .env.example .env

# Install dependencies
npm install
```

#### Get Telegram API Credentials

1. Visit [my.telegram.org](https://my.telegram.org)
2. Log in with your phone number
3. Go to "API development tools"
4. Create a new application
5. Copy your **API ID** and **API Hash**
6. Paste them into `.env` file:

```env
TELEGRAM_API_ID=your_api_id_here
TELEGRAM_API_HASH=your_api_hash_here
```

#### Development

```bash
# Start development server (http://localhost:1234)
npm run dev

# Build for production
npm run build:production

# Run tests
npm run test

# Check code quality
npm run check
```

### 📦 Build Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build:production` | Build optimized production bundle |
| `npm run build:staging` | Build staging version |
| `npm run check` | Run TypeScript, ESLint, and Stylelint |
| `npm run check:fix` | Auto-fix linting issues |
| `npm run test` | Run Jest tests |
| `npm run icons:build` | Rebuild icon fonts |

### 🌐 Deployment

#### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel --prod

# Or use GitHub integration for automatic deployments
```

#### Docker

```bash
docker build -t housegramx .
docker run -p 3000:3000 housegramx
```

### 🛠️ Tech Stack

- **Framework**: React-like [Teact](https://github.com/Ajaxy/teact)
- **API Client**: Custom [GramJS](https://github.com/gram-js/gramjs)
- **Build Tool**: Webpack 5
- **Language**: TypeScript
- **Styling**: SCSS with CSS Modules
- **Testing**: Jest + Playwright
- **Linting**: ESLint + Stylelint

### 📚 Project Structure

```
HouseGramX/
├── src/
│   ├── api/              # Telegram API integration
│   ├── components/       # React components
│   ├── assets/           # Images, icons, localization
│   ├── styles/           # Global styles
│   ├── hooks/            # Custom React hooks
│   ├── util/             # Utility functions
│   └── index.tsx         # Entry point
├── public/               # Static files
├── webpack.config.ts     # Webpack configuration
├── package.json          # Dependencies
└── README.md             # This file
```

### 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📝 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

### ⚖️ Legal Notice

This is an independent project and is not affiliated with Telegram. Telegram is a trademark of Telegram FZ-LLC.

---

## 🇷🇺 Русский

### 🎯 О проекте

**HouseGramX** — это современный, легкий веб-клиент для Telegram, созданный на основе награжденного Telegram Web A, который выиграл первый приз 🥇 на [конкурсе легких клиентов Telegram](https://contest.com/javascript-web-3).

Этот проект демонстрирует передовые веб-технологии и лучшие практики:
- ⚡ **Нулевые зависимости** - Построен на кастомном фреймворке [Teact](https://github.com/Ajaxy/teact)
- 🔐 **Безопасность** - Использует кастомный [GramJS](https://github.com/gram-js/gramjs) для MTProto
- 🚀 **Высокая производительность** - WebSockets, Web Workers, WebAssembly
- 💾 **Умное кеширование** - Многоуровневое кеширование и поддержка PWA
- 🎨 **Красивый интерфейс** - Продвинутые CSS/Canvas/SVG анимации
- 🔊 **Богатый медиа** - Запись голоса, потоковая передача и криптография

### 🚀 Быстрый старт

#### Требования
- Node.js 22.6+ или выше
- npm 10.8+ или выше

#### Установка

```bash
# Клонируем репозиторий
git clone https://github.com/GohHacked/HouseGramX.git
cd HouseGramX

# Копируем файл окружения
cp .env.example .env

# Устанавливаем зависимости
npm install
```

#### Получение учетных данных Telegram API

1. Перейдите на [my.telegram.org](https://my.telegram.org)
2. Войдите с номером телефона
3. Перейдите в "API development tools"
4. Создайте новое приложение
5. Скопируйте **API ID** и **API Hash**
6. Вставьте их в файл `.env`:

```env
TELEGRAM_API_ID=ваш_api_id
TELEGRAM_API_HASH=ваш_api_hash
```

#### Разработка

```bash
# Запустить dev сервер (http://localhost:1234)
npm run dev

# Собрать для production
npm run build:production

# Запустить тесты
npm run test

# Проверить качество кода
npm run check
```

### 📦 Скрипты сборки

| Команда | Описание |
|---------|---------|
| `npm run dev` | Запустить dev сервер с горячей перезагрузкой |
| `npm run build:production` | Собрать оптимизированный production бандл |
| `npm run build:staging` | Собрать staging версию |
| `npm run check` | Запустить TypeScript, ESLint и Stylelint |
| `npm run check:fix` | Автоматически исправить ошибки линтера |
| `npm run test` | Запустить Jest тесты |
| `npm run icons:build` | Пересобрать шрифты иконок |

### 🌐 Развертывание

#### Vercel (Рекомендуется)

```bash
# Развернуть на Vercel
vercel --prod

# Или используйте интеграцию с GitHub для автоматических развертываний
```

#### Docker

```bash
docker build -t housegramx .
docker run -p 3000:3000 housegramx
```

### 🛠️ Технологический стек

- **Фреймворк**: React-подобный [Teact](https://github.com/Ajaxy/teact)
- **API клиент**: Кастомный [GramJS](https://github.com/gram-js/gramjs)
- **Инструмент сборки**: Webpack 5
- **Язык**: TypeScript
- **Стили**: SCSS с CSS Modules
- **Тестирование**: Jest + Playwright
- **Линтинг**: ESLint + Stylelint

### 📚 Структура проекта

```
HouseGramX/
├── src/
│   ├── api/              # Интеграция с Telegram API
│   ├── components/       # React компоненты
│   ├── assets/           # Изображения, иконки, локализация
│   ├── styles/           # Глобальные стили
│   ├── hooks/            # Кастомные React хуки
│   ├── util/             # Утилиты
│   └── index.tsx         # Точка входа
├── public/               # Статические файлы
├── webpack.config.ts     # Конфигурация Webpack
├── package.json          # Зависимости
└── README.md             # Этот файл
```

### 🤝 Вклад в проект

Мы приветствуем вклад! Пожалуйста:

1. Сделайте fork репозитория
2. Создайте ветку для функции (`git checkout -b feature/amazing-feature`)
3. Закоммитьте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

### 📝 Лицензия

Этот проект лицензирован под **GNU General Public License v3.0** - см. файл [LICENSE](LICENSE) для деталей.

### ⚖️ Юридическое уведомление

Это независимый проект и не связан с Telegram. Telegram является товарным знаком Telegram FZ-LLC.

---

## 🎉 Features / Возможности

✨ **Lightweight** - Минимальный размер бандла  
🔒 **Secure** - Полная поддержка E2E шифрования  
📱 **Responsive** - Работает на всех устройствах  
🌙 **Dark Mode** - Встроенная поддержка темной темы  
🌍 **Multi-language** - Поддержка множества языков  
⚙️ **Customizable** - Легко расширяется и кастомизируется  

---

## 📞 Support / Поддержка

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/GohHacked/HouseGramX/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/GohHacked/HouseGramX/discussions)
- 📧 **Email**: [Contact us](mailto:support@housegramx.com)

---

**Made with ❤️ by the HouseGramX Team**

*Сделано с ❤️ командой HouseGramX*
