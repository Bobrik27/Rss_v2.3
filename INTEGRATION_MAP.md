# Integration Map for n8n Workflows

## Endpoint: /webhook/wb/parse
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

## Endpoint: /webhook/wb/full-audit
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

## Endpoint: /webhook/wb-status
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