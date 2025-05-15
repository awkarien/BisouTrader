// Pure Edge Runtime compatible handler
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // Set base headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
  
  // Handle OPTIONS (CORS preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // Only accept POST
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers }
    );
  }
  
  try {
    // Parse the request body as JSON
    let frameMessage = {};
    try {
      frameMessage = await request.json();
    } catch (e) {
      frameMessage = {};
    }
    
    // Very basic validation (in a real app, you'd verify with Farcaster libraries)
    const isValid = !!(frameMessage.messageHash && 
                       frameMessage.signature &&
                       frameMessage.timestamp);
    
    if (!isValid) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          message: "Invalid frame message format" 
        }),
        { status: 400, headers }
      );
    }
    
    // Return validation success
    return new Response(
      JSON.stringify({ valid: true }),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        valid: false, 
        message: "Error validating frame message" 
      }),
      { status: 500, headers }
    );
  }
}