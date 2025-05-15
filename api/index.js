// Simplified API handler for Vercel
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
  
  // Determine which endpoint was called
  const path = req.url.split('/').pop();
  
  if (path === 'verify' && req.method === 'POST') {
    // Handle frame verification
    return verifyFrameHandler(req, res);
  } else if (path === 'action' && req.method === 'POST') {
    // Handle frame actions
    return frameActionHandler(req, res);
  } else {
    // Default response for unmatched routes
    res.status(404).json({ error: 'Not found' });
  }
}

// Simple validation for frame messages
function validateFrameMessage(frameMessage) {
  if (!frameMessage) {
    return { valid: false, message: "No frame message provided" };
  }
  
  // Very basic validation - in a real app, you'd verify these with farcaster SDK
  if (frameMessage.messageHash && 
      frameMessage.signature &&
      frameMessage.timestamp) {
    return { valid: true };
  }
  
  return { valid: false, message: "Invalid frame message format" };
}

// Handler for frame verification
function verifyFrameHandler(req, res) {
  try {
    const frameMessage = req.body;
    const validationResult = validateFrameMessage(frameMessage);
    
    if (!validationResult.valid) {
      return res.status(400).json({ 
        valid: false, 
        message: validationResult.message 
      });
    }
    
    return res.status(200).json({ valid: true });
  } catch (error) {
    console.error("Error validating frame message:", error);
    return res.status(500).json({ 
      valid: false, 
      message: "Error validating frame message" 
    });
  }
}

// Handler for frame actions
function frameActionHandler(req, res) {
  try {
    const { buttonIndex, frameMessage } = req.body;
    const validationResult = validateFrameMessage(frameMessage);
    
    if (!validationResult.valid) {
      return res.status(400).json({ 
        success: false, 
        message: validationResult.message,
        nextFrameMetadata: null 
      });
    }
    
    // Generate the appropriate next frame based on which button was clicked
    let frameAction = "";
    
    switch (buttonIndex) {
      case 1: // Buy 50 $BISOU
        frameAction = "buy50";
        break;
      case 2: // Buy 250 $BISOU
        frameAction = "buy250";
        break;
      case 3: // Buy 500 $BISOU
        frameAction = "buy500";
        break;
      case 4: // Custom amount
        frameAction = "custom";
        break;
      default:
        return res.status(400).json({ 
          success: false, 
          message: "Invalid button index",
          nextFrameMetadata: null 
        });
    }
    
    // Use the fixed domain for Vercel deployment
    const baseUrl = "https://bisou-trader.vercel.app";
    const redirectUrl = `${baseUrl}?frameAction=${frameAction}`;
    
    // The metadata for the next frame
    const nextFrameMetadata = {
      image: "https://ipfs.io/ipfs/bafkreighrlz43fgcdmqdtyv755zmsqsn5iey5stxvicgxfygfn6mxoy474",
      buttons: [
        { label: "Continue to Purchase", action: "post" }
      ],
      postUrl: redirectUrl
    };
    
    return res.status(200).json({
      success: true,
      nextFrameMetadata,
      redirectUrl
    });
  } catch (error) {
    console.error("Error handling frame action:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Error handling frame action",
      nextFrameMetadata: null 
    });
  }
}