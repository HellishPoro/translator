# Tooltip Translator

**Tooltip Translator** — расширяемое React-приложение для перевода текста с поддержкой:

- перевода на лету через API,

- распознавания речи,

- озвучивания текста (Text-to-Speech),

- глоссария,

- фильтрации и управления словарем.

---

## Технологии

- **React 18+**

- **TypeScript 5+**

- **Vite**

- **Zustand** — управление глобальным состоянием

- **Mantine UI** — UI-компоненты и модальные окна

- **Axios** — HTTP-запросы

- **Tabler Icons** — иконки

- **Custom hooks** — `useSpeechRecognition`, `useTranslation`

- **Clipboard**, **Text-to-Speech**, **Speech Recognition**

---

## Структура проекта

src/

├── api/ # Работа с API (axios, перевод, языки)

│

├── components/ # UI-компоненты

│ ├── GlossaryFilter/ # Фильтр для глоссария

│ ├── GlossaryItem/ # Элемент глоссария

│ ├── Header/ # Верхняя панель с кнопками

│ ├── LanguageSelector/ # Выпадающий список для выбора языков

│ ├── TextWithTooltip/ # Компонент текста с тултипами

│ ├── TooltipTranslator/ # Тултип-переводчик

│ └── TranslateModal/ # Модальное окно для перевода

│ └── index.ts # Индексация и экспорт компонентов

│

├── constants/ # Константы (например, языки по умолчанию)

│

├── hooks/ # Кастомные React-хуки

│

├── pages/ # Страницы приложения

│

├── store/ # Zustand-хранилища (переводы, глоссарий и т.д.)

│

├── types/ # Глобальные TypeScript-типы

│

├── utils/ # Утилиты и вспомогательные функции

│

├── App.tsx # Главный компонент приложения

├── main.tsx # Точка входа в приложение

---

## Основные компоненты

### TranslateModal

Модальное окно для ввода текста, перевода и прослушивания:

Использует LanguageSelector для выбора языков.

Распознает речь с помощью useSpeechRecognition.

Автоматически переводит с задержкой (debounce).

Отображает ошибку и позволяет копировать результат.

### TooltipTranslator

При выделении слова отображается tooltip с переводом.

Поддерживает озвучку оригинального и переведённого текста.

Возможность добавления слова в глоссарий.

### GlossaryFilter

Хранит сохраненные слова и их перевод.

Возможность удаления слов.

Можно использовать фильтрацию.

---

## API

В .env задается переменная:

```VITE_API_BASE_URL=https://example.com/api```

---

## Вызовы:

POST /d4evir8cmhdpro9juk3s — список языков

POST /d4efot9b5crnbr09g2mt — перевод текста

POST /d4e0ng82lsmf6gpteqpe — определение языка

---

## Озвучка и распознавание речи

Используется Web Speech API:

Распознавание — SpeechRecognition (через кастомный useSpeechRecognition)

Озвучка — SpeechSynthesis

---

## Состояния (Zustand)

useTranslateStore

sourceText, sourceLanguageCode, targetLanguageCode

Список доступных языков

useGlossaryStore

Глоссарий со словами и переводами

Фильтрация, добавление и удаление

---

## Разработка

```

# Установка зависимостей

npm install

# Запуск в dev-режиме

npm run dev

# Сборка

npm run build

# Просмотр сборки

npm run preview

```