# n8n Workflow Fixes Required

## F: Status Proxy Workflow (ID: 1CK1QXeRYeNtLqWX7AyhH) - Required Changes

### 1. Parameter Sync
- **Issue**: Frontend sends `projectId` but workflow expects `id`
- **Fix**: Update the webhook node to accept both `projectId` and `id` as parameters
- **Location**: `F_STATUS_POLLING` webhook node
- **Action**: Modify the path or add a code node early to map `projectId` to `id`

### 2. Error Handling Enhancement
- **Issue**: HTTP request to Python core may fail without proper response
- **Location**: `F_CORE_STATUS_REQUEST` and `Code in JavaScript` nodes
- **Fix**: Add error handling to ensure every scenario returns a response

#### Current Code Node Logic (needs update):
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

#### Updated Code Node Logic (should be):
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

### 3. HTTP Request Node Configuration ("Continue on Fail")
- **Issue**: If the Python server is down, the HTTP Request node must not stop the workflow
- **Location**: `F_CORE_STATUS_REQUEST` HTTP Request node
- **Fix**: Enable "Continue on Fail" or "Always Output Data" setting so that even if the backend returns 500 or is unreachable, the workflow continues to the Code node to return a proper error response

### 4. Respond to Webhook Node Configuration
- **Issue**: May not be configured to return all data
- **Location**: `Respond to Webhook` node
- **Fix**: Set "Respond With" to "All Item Data" instead of a specific field

### 4. Parameter Mapping Code Node (if needed)
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

## Verification Steps
1. After making changes in n8n, activate the workflow
2. Test with a non-existent project ID to ensure it returns the error response
3. Verify that all polling requests return valid JSON
4. Confirm parameter mapping works for both `id` and `projectId`
5. Test when Python backend is down/unreachable to ensure "Continue on Fail" setting works and returns proper error response