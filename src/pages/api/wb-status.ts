import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const projectId = url.searchParams.get('id');
  if (!projectId) return new Response('Missing ID', { status: 400 });

  // NEW TARGET: n8n Webhook Gateway
  const targetUrl = `https://steerefuepatam.beget.app/webhook/wb-status?id=${projectId}`;

  try {
    const response = await fetch(targetUrl);
    // Even if it is 404, we want to return the JSON body to the frontend
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // If Python is totally down or returns 404 without JSON
    return new Response(JSON.stringify({ status: 'not_found', stage: 'initializing' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};