// Farcaster-related utilities
import { apiRequest } from "./queryClient";

// Verify Farcaster message signature
export const verifyFrameMessage = async (
  frameMessage: Record<string, any>
): Promise<boolean> => {
  try {
    const response = await apiRequest(
      "POST", 
      "/api/frames/verify", 
      frameMessage
    );
    
    const { valid } = await response.json();
    return valid;
  } catch (error) {
    console.error("Error verifying frame message:", error);
    return false;
  }
};

// Submit a frame action
export const submitFrameAction = async (
  buttonIndex: number,
  frameMessage: Record<string, any>
): Promise<any> => {
  try {
    const response = await apiRequest(
      "POST",
      "/api/frames/action",
      {
        buttonIndex,
        frameMessage
      }
    );
    
    return await response.json();
  } catch (error) {
    console.error("Error submitting frame action:", error);
    throw error;
  }
};

// Generate the URL for the next frame based on action
export const generateNextFrameUrl = (
  baseUrl: string,
  action: string,
  params: Record<string, string> = {}
): string => {
  const url = new URL(baseUrl);
  url.searchParams.append("frameAction", action);
  
  // Add any additional parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
};
