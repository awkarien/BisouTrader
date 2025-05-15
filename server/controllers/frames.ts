import { Request, Response } from "express";
import { storage } from "../storage";
import { validateFrameMessage as validateFrame } from "../services/frame-validator";
import { insertFrameSchema } from "@shared/schema";

// Validate a Farcaster Frame message
export const validateFrameMessage = async (req: Request, res: Response) => {
  try {
    const frameMessage = req.body;
    
    // Validate the frame message using the Frame validation service
    const { valid, message } = await validateFrame(frameMessage);
    
    if (!valid) {
      return res.status(400).json({ valid: false, message });
    }
    
    // Store the frame interaction if valid
    if (frameMessage.fid) {
      const frameData = insertFrameSchema.parse({
        frameUrl: frameMessage.url || '',
        fid: frameMessage.fid,
        sessionId: frameMessage.sessionId || null
      });
      
      await storage.storeFrameInteraction(frameData);
    }
    
    return res.json({ valid: true });
  } catch (error) {
    console.error("Error validating frame message:", error);
    return res.status(500).json({ 
      valid: false, 
      message: "Error validating frame message" 
    });
  }
};

// Handle frame action (button clicks)
export const handleFrameAction = async (req: Request, res: Response) => {
  try {
    const { buttonIndex, frameMessage } = req.body;
    
    // Validate the frame message
    const { valid, message } = await validateFrame(frameMessage);
    
    if (!valid) {
      return res.status(400).json({ 
        success: false, 
        message,
        nextFrameMetadata: null 
      });
    }
    
    // Generate the appropriate next frame based on which button was clicked
    let frameAction = "";
    let redirectUrl = "";
    
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
    
    // Create the next frame metadata
    // In a real implementation, this would generate the appropriate HTML with
    // meta tags for Farcaster Frames to display
    let baseUrl = "";
    
    // Try to get the host from the request headers
    const host = req.headers.host || "localhost:5000";
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    
    baseUrl = `${protocol}://${host}`;
    redirectUrl = `${baseUrl}?frameAction=${frameAction}`;
    
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
};
