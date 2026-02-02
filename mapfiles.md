# Карта файлов проекта

## Frontend файлы

### src/config/api.ts — структура:
```
1–8     экспортирует API_CONFIG с baseUrl и эндпоинтами (parse, trigger, status)
```

### src/components/wb-audit/WBAuditWidget.tsx — структура:
```
1–8     imports, UI helpers (Toast)
9–27    состояние компонента (useState, useEffect, useRef)
29–42   конфигурация модулей анализа
44–218  логика handleStartAnalysis (валидация URL, извлечение SKU, вызовы API, polling)
220–224 эффект для прокрутки логов
226–485 JSX разметка (Header, Grid View, Audit Interface, Result View)
```

### src/pages/[lang]/tools/wb-audit.astro — структура:
```
1–11    imports и getStaticPaths для мультиязычности
13–18   рендеринг Layout с WBAuditWidget
```

### src/components/Header.astro — структура:
```
1–14    imports и определение Props
16–37   массив navItems с маршрутами
39–88   JSX разметка хедера с навигацией
```

## Основные файлы проекта

### src/layouts/Layout.astro — структура:
```
1–12    imports и определение Props
14–26   HTML разметка с Header, slot и Footer
```

### src/pages/[lang]/index.astro — структура:
```
1–24    imports и getStaticPaths
26–74   JSX разметка основной страницы с компонентами
```

### src/components/StaticHero.astro — структура:
```
1–27    imports и определение Props
29–74   JSX разметка героя с анимациями и кнопками
```

### src/components/sections/Competencies.astro — структура:
```
1–10    imports и определение Props
12–85   JSX разметка сетки компетенций
```

### src/content/config.ts — структура:
```
1–30    определение схем для блога и новостей
32–40   экспорт contentCollections
```

### src/i18n/content.ts — структура:
```
1–200   определение переводов для разных языков
202–300 экспорт словарей
```

### astro.config.mjs — структура:
```
1–10    imports
12–30   конфигурация Astro с интеграциями
32–45   экспорт конфигурации
```

### package.json — структура:
```
1–15    основная информация о проекте
16–40   зависимости
41–50   скрипты