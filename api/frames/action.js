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
    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      body = {};
    }
    
    const buttonIndex = body?.buttonIndex || 1;
    
    // Map button index to action
    let frameAction = "buy50";
    switch (buttonIndex) {
      case 1: frameAction = "buy50"; break;
      case 2: frameAction = "buy250"; break;
      case 3: frameAction = "buy500"; break;
      case 4: frameAction = "custom"; break;
    }
    
    // Build the next frame response
    const baseUrl = "https://bisou-trader-1gih-4owgwr9rq-awkariens-projects.vercel.app";
    
    const responseBody = {
      success: true,
      nextFrameMetadata: {
        image: "https://ipfs.io/ipfs/bafkreighrlz43fgcdmqdtyv755zmsqsn5iey5stxvicgxfygfn6mxoy474",
        buttons: [
          { label: "Continue to Purchase", action: "post" }
        ],
        postUrl: baseUrl
      }
    };
    
    return new Response(
      JSON.stringify(responseBody),
      { status: 200, headers }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Internal server error" 
      }),
      { status: 500, headers }
    );
  }
}