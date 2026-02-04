# Документация по интеграциям проекта "Run Swift Studio v3"

## Интеграционная карта для n8n Workflows

### Endpoint: /webhook/wb/parse
- **Method:** POST
- **Required Body/Params:** { url: "wildberries product URL" }
- **n8n Internal Logic:** Webhook -> Extract SKU with Regex -> HTTP Request to Python Core -> Validate Response -> Respond
- **Success JSON Structure:** 
  ```json
  {
    "status": "success",
    "data": { ...parsed product data... }
  }
  ```
- **Error JSON Structure:**
  ```json
  {
    "status": "error",
    "message": "Товар временно недоступен",
    "data": null
  }
  ```

### Endpoint: /webhook/wb/full-audit
- **Method:** POST
- **Required Body/Params:** { url: "main product URL", competitors: ["array", "of", "competitor", "urls"], email: "user email" }
- **n8n Internal Logic:** Webhook -> Create DB Record -> HTTP Request to Python Core -> Telegram Notification -> Immediate Response
- **Success JSON Structure:** 
  ```json
  {
    "message": "Workflow got started."
  }
  ```
- **Error JSON Structure:** 
  - Errors typically handled internally, may return empty response

### Endpoint: /webhook/wb-status
- **Method:** GET
- **Required Body/Params:** { id: "project ID to check status for" }
- **n8n Internal Logic:** Webhook -> HTTP Request to Python Core -> Process Response with fallback logic -> Respond
- **Success JSON Structure:** 
  ```json
  {
    "phase": "ANALYZING",
    "progress_hint": 65,
    "status": "processing",
    "message": "Currently analyzing competitor prices..."
  }
  ```
- **Error JSON Structure:**
  ```json
  {
    "phase": "INIT",
    "progress_hint": 5,
    "status": "processing",
    "message": "Initializing project..."
  }
  ```

### Critical Issue Diagnosis: Empty Response Problem
The "wb-status" workflow has a potential issue causing empty responses:

1. **Root Cause:** The workflow has a conditional logic path that may not reach the "Respond to Webhook" node
2. **Problem Nodes:** 
   - "F_CORE_STATUS_REQUEST" (HTTP Request) may fail or return unexpected data
   - "Code in JavaScript" processes the response but has a fallback mechanism
   - If the HTTP request fails AND the fallback conditions aren't met, the workflow may terminate without responding
3. **Configuration Issue:** The "Respond to Webhook" node might not be set to "All Item Data" mode, which could cause empty responses when no data flows to it
4. **Missing Error Handling:** If the Python backend returns a 404 (project not found), the fallback logic should always execute, but there could be edge cases where no response is generated

### Frontend Alignment Issues
Comparing with frontend expectations in `WBAuditWidget.tsx`:
- Frontend expects: `{ phase: string, message?: string, productData?: object, pdf_url?: string }`
- n8n provides: Should match the expected structure
- Key mismatch potential: Frontend looks for `productData` but n8n might send different field names
- The polling interval is 3 seconds, which aligns with typical n8n processing times

## Исправления n8n Workflow

### F: Status Proxy Workflow (ID: 1CK1QXeRYeNtLqWX7AyhH) - Required Changes

#### 1. Parameter Sync
- **Issue**: Frontend sends `projectId` but workflow expects `id`
- **Fix**: Update the webhook node to accept both `projectId` and `id` as parameters
- **Location**: `F_STATUS_POLLING` webhook node
- **Action**: Modify the path or add a code node early to map `projectId` to `id`

#### 2. Error Handling Enhancement
- **Issue**: HTTP request to Python core may fail without proper response
- **Location**: `F_CORE_STATUS_REQUEST` and `Code in JavaScript` nodes
- **Fix**: Add error handling to ensure every scenario returns a response

##### Current Code Node Logic (needs update):
```
// Проверяем, что пришло от HTTP ноды
const httpNode = $node["HTTP Request"];
const response = httpNode.json;
const status = httpNode.statusCode;

// Состояние по умолчанию (если проекта еще нет)
const fallback = {
  "phase": "INIT",
  "progress_hint": 5,
  "status": "processing",
  "message": "Initializing project..."
};

// Логика: если Python выдал ошибку или пустой объект
if (status !== 200 || !response || response.detail === "Not Found") {
  return { json: fallback };
}

// Если все хорошо — отдаем реальный статус
return { json: response };
```

##### Updated Code Node Logic (should be):
```
// Проверяем, что пришло от HTTP ноды
const httpNode = $node["HTTP Request"];

// Обработка случая, когда HTTP нода не вернула результат
if (!httpNode || !httpNode.json) {
  return {
    json: {
      "phase": "ERROR",
      "status": "error", 
      "message": "Backend unreachable or project not found"
    }
  };
}

const response = httpNode.json;
const status = httpNode.statusCode;

// Состояние по умолчанию (если проекта еще нет)
const fallback = {
  "phase": "INIT",
  "progress_hint": 5,
  "status": "processing",
  "message": "Initializing project..."
};

// Логика: если Python выдал ошибку или пустой объект
if (status !== 200 || !response || (response.detail && response.detail === "Not Found")) {
  return { 
    json: {
      "phase": "ERROR",
      "status": "error",
      "message": "Backend unreachable or project not found"
    }
  };
}

// Если все хорошо — отдаем реальный статус
return { json: response };
```

#### 3. HTTP Request Node Configuration ("Continue on Fail")
- **Issue**: If the Python server is down, the HTTP Request node must not stop the workflow
- **Location**: `F_CORE_STATUS_REQUEST` HTTP Request node
- **Fix**: Enable "Continue on Fail" or "Always Output Data" setting so that even if the backend returns 500 or is unreachable, the workflow continues to the Code node to return a proper error response

#### 4. Respond to Webhook Node Configuration
- **Issue**: May not be configured to return all data
- **Location**: `Respond to Webhook` node
- **Fix**: Set "Respond With" to "All Item Data" instead of a specific field

#### 5. Parameter Mapping Code Node (if needed)
If the parameter sync can't be handled in the webhook, add a code node after the webhook to map parameters:

```
// Map projectId to id for compatibility
const id = $json.query.id || $json.query.projectId;
const guestId = $json.query.guestId;

return {
  json: {
    query: {
      id: id,
      guestId: guestId
    }
  }
};
```

### Verification Steps
1. After making changes in n8n, activate the workflow
2. Test with a non-existent project ID to ensure it returns the error response
3. Verify that all polling requests return valid JSON
4. Confirm parameter mapping works for both `id` and `projectId`
5. Test when Python backend is down/unreachable to ensure "Continue on Fail" setting works and returns proper error response

## API Конфигурация

### Файл: `src/config/api.ts`
- Базовый URL: `https://steerefuepatam.beget.app`
- Эндпоинты:
  - `/webhook/wb/parse` - Парсинг товаров Wildberries (Workflow A)
  - `/webhook/wb/full-audit` - Запуск полного аудита (Workflow B)
  - `/webhook/wb-status` - Статус аудита (Workflow F)

## WB Audit Инструмент
- Страница: `src/pages/[lang]/tools/wb-audit.astro`
- Компонент: `src/components/wb-audit/WBAuditWidget.tsx`
- Навигация: "Кейсы" → `/[lang]/tools/wb-audit`
- Интеграция с n8n workflow через webhook-запросы
- Защита от CORS через cache-busting параметры
- Обработка массивов данных от n8n

## Карта файлов проекта

### Frontend файлы

#### src/config/api.ts — структура:
```
1–8     экспортирует API_CONFIG с baseUrl и эндпоинтами (parse, trigger, status)
```

#### src/components/wb-audit/WBAuditWidget.tsx — структура:
```
1–8     imports, UI helpers (Toast)
9–27    состояние компонента (useState, useEffect, useRef)
29–42   конфигурация модулей анализа
44–218  логика handleStartAnalysis (валидация URL, извлечение SKU, вызовы API, polling)
220–224 эффект для прокрутки логов
226–485 JSX разметка (Header, Grid View, Audit Interface, Result View)
```

#### src/pages/[lang]/tools/wb-audit.astro — структура:
```
1–11    imports и getStaticPaths для мультиязычности
13–18   рендеринг Layout с WBAuditWidget
```

#### src/components/Header.astro — структура:
```
1–14    imports и определение Props
16–37   массив navItems с маршрутами
39–88   JSX разметка хедера с навигацией
```

### Основные файлы проекта

#### src/layouts/Layout.astro — структура:
```
1–12    imports и определение Props
14–26   HTML разметка с Header, slot и Footer
```

#### src/pages/[lang]/index.astro — структура:
```
1–24    imports и getStaticPaths
26–74   JSX разметка основной страницы с компонентами
```

#### src/components/StaticHero.astro — структура:
```
1–27    imports и определение Props
29–74   JSX разметка героя с анимациями и кнопками
```

#### src/components/sections/Competencies.astro — структура:
```
1–10    imports и определение Props
12–85   JSX разметка сетки компетенций
```

#### src/content/config.ts — структура:
```
1–30    определение схем для блога и новостей
32–40   экспорт contentCollections
```

#### src/i18n/content.ts — структура:
```
1–200   определение переводов для разных языков
202–300 экспорт словарей
```

#### astro.config.mjs — структура:
```
1–10    imports
12–30   конфигурация Astro с интеграциями
32–45   экспорт конфигурации
```

#### package.json — структура:
```
1–15    основная информация о проекте
16–40   зависимости
41–50   скрипты
```

## API Endpoints для AI Agency Core

### Основные эндпоинты:
- Health Check: `/health` для проверки статуса системы
- WB Parse: `/api/v1/wb-audit/parse` для синхронного получения данных о продукте
- WB Full Audit: `/api/v1/wb-audit/full` для асинхронной обработки аудита
- Status Check: `/api/v1/wb-audit/status/{project_id}` для отслеживания прогресса аудита
- PDF Generation: `/api/v1/wb-audit/generate-pdf` для компиляции отчета