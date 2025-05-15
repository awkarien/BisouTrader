// Super simple API handler for Vercel
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Simple ping/test response
  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', message: 'Frame API is running' });
  }
  
  // For POST requests (frame actions)
  if (req.method === 'POST') {
    try {
      const buttonIndex = req.body?.buttonIndex || 1;
      
      // Map button index to action
      let frameAction = "buy50";
      switch (buttonIndex) {
        case 1: frameAction = "buy50"; break;
        case 2: frameAction = "buy250"; break;
        case 3: frameAction = "buy500"; break;
        case 4: frameAction = "custom"; break;
      }
      
      // Create the response with next frame info
      const baseUrl = "https://bisou-trader-1gih-4owgwr9rq-awkariens-projects.vercel.app";
      
      return res.status(200).json({
        success: true,
        nextFrameMetadata: {
          image: "https://ipfs.io/ipfs/bafkreighrlz43fgcdmqdtyv755zmsqsn5iey5stxvicgxfygfn6mxoy474",
          buttons: [
            { label: "Continue to Purchase", action: "post" }
          ],
          postUrl: baseUrl
        }
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  }
  
  // Default response for unmatched methods
  res.status(405).json({ error: 'Method not allowed' });
}