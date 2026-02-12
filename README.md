# Beatmap Editor

Веб-приложение для создания и редактирования уровней для ритм-шутера Beam & Beat.

## Технологический стек

- **Framework**: [Next.js 16](https://nextjs.org/) с App Router и Turbopack
- **UI Library**: [HeroUI v2](https://heroui.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Audio**: [WaveSurfer.js](https://wavesurfer.xyz/)
- **Icons**: [@vkontakte/icons](https://vkcom.github.io/icons/)
- **File Processing**: [JSZip](https://stuk.github.io/jszip/), [FileSaver.js](https://github.com/eligrey/FileSaver.js/)

## Установка и запуск

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

### Сборка для продакшена

```bash
npm run build
npm run start
```

## Скрипты

- `npm run dev` — запуск dev-сервера с Turbopack
- `npm run build` — сборка проекта для продакшена
- `npm run start` — запуск production-сервера
- `npm run lint` — проверка кода линтером
- `npm run lint:fix` — автоматическое исправление ошибок линтера

## Структура проекта

Проект использует архитектуру **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)**:

```
beatmap-editor/
├── src/
│   ├── app/         # Инициализация приложения, провайдеры, роутинг
│   ├── entities/    # Бизнес-сущности (beatmap, track, note и т.д.)
│   ├── features/    # Функциональные возможности приложения
│   ├── shared/      # Переиспользуемый код (UI-kit, utils, hooks)
│   └── widgets/     # Композитные блоки страниц
├── app/             # Next.js App Router (страницы и layouts)
├── config/          # Конфигурационные файлы
├── content/         # Контент и локализация
└── styles/          # Глобальные стили
```

## Лицензия

Проприетарное программное обеспечение. См. [LICENSE](./LICENSE) для деталей.
