export const API_CONFIG = {
  baseUrl: import.meta.env.PUBLIC_N8N_HOST || 'https://steerefuepatam.beget.app',
  endpoints: {
    parse: '/webhook/wb/parse',        // Workflow A (Teaser)
    trigger: '/webhook/wb/full-audit', // Workflow B (Trigger via n8n)
    // DIRECT URL FOR STATUS
    status: (id: string) => `/webhook/wb-status?id=${id}`
  }
};