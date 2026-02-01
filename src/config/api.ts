export const API_CONFIG = {
  baseUrl: import.meta.env.PUBLIC_N8N_HOST || 'https://steerefuepatam.beget.app',
  endpoints: {
    parse: '/webhook/wb/parse',
    fullAudit: '/webhook/wb/full-audit',
  }
};