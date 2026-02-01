import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const projectId = url.searchParams.get('id');
  const timestamp = url.searchParams.get('t'); // Cache buster from frontend
  
  if (!projectId) return new Response('Missing ID', { status: 400 });

  // Target the new n8n Workflow F gateway
  const targetUrl = `https://steerefuepatam.beget.app/webhook/wb-status?id=${projectId}&t=${timestamp}`;

  try {
    const response = await fetch(targetUrl);
    const text = await response.text();
    
    // Safety check: if response is empty, return "processing"
    if (!text || text.trim() === "") {
        return new Response(JSON.stringify({ status: 'processing', stage: 'initializing' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(text, {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ status: 'processing', stage: 'initializing' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};