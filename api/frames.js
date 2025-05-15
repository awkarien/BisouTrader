import express from 'express';
import bodyParser from 'body-parser';

// For Vercel serverless functions
export const config = {
  runtime: 'edge',
};

const app = express();
app.use(bodyParser.json());

// Allow CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Simple validation for frame messages
const validateFrameMessage = async (frameMessage) => {
  if (!frameMessage) {
    return { valid: false, message: "No frame message provided" };
  }
  
  // Very basic validation for demo purposes
  if (frameMessage.messageHash && 
      frameMessage.signature &&
      frameMessage.timestamp) {
    
    // In a real app, we would verify these with farcaster SDK
    return { valid: true };
  }
  
  return { valid: false, message: "Invalid frame message format" };
};

// Verify a frame message
app.post('/verify', async (req, res) => {
  try {
    const frameMessage = req.body;
    
    // Validate the frame message
    const { valid, message } = await validateFrameMessage(frameMessage);
    
    if (!valid) {
      return res.status(400).json({ valid: false, message });
    }
    
    return res.json({ valid: true });
  } catch (error) {
    console.error("Error validating frame message:", error);
    return res.status(500).json({ 
      valid: false, 
      message: "Error validating frame message" 
    });
  }
});

// Handle frame action (button clicks)
app.post('/action', async (req, res) => {
  try {
    const { buttonIndex, frameMessage } = req.body;
    
    // Validate the frame message
    const { valid, message } = await validateFrameMessage(frameMessage);
    
    if (!valid) {
      return res.status(400).json({ 
        success: false, 
        message,
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
    
    // Use the fixed Vercel domain
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
    
    return res.json({
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
});

export default app;