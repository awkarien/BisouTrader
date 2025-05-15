import express, { Router, type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { validateFrameMessage, handleFrameAction } from "./controllers/frames";

export async function registerRoutes(app: Express): Promise<Server> {
  // Frames API routes
  const framesRouter = Router();
  
  // Verify a frame message
  framesRouter.post("/verify", validateFrameMessage);
  
  // Handle frame action
  framesRouter.post("/action", handleFrameAction);
  
  // Register frames routes
  app.use("/api/frames", framesRouter);
  
  // Additional API routes can be added here
  
  const httpServer = createServer(app);
  
  return httpServer;
}
