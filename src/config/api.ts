export const API_CONFIG = {
  baseUrl: import.meta.env.PUBLIC_N8N_HOST || 'https://steerefuepatam.beget.app',
  endpoints: {
    parse: '/webhook/wb/parse',        // Workflow A
    trigger: '/webhook/wb/full-audit', // Workflow B
    status: (id: string) => `/api/v1/wb-audit/status/${id}` // Python Core
  }
};