import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Frame-related schema
export const frames = pgTable("frames", {
  id: serial("id").primaryKey(),
  frameUrl: text("frame_url").notNull(),
  fid: integer("fid"),
  sessionId: text("session_id"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertFrameSchema = createInsertSchema(frames).omit({
  id: true,
  timestamp: true,
});

export type InsertFrame = z.infer<typeof insertFrameSchema>;
export type Frame = typeof frames.$inferSelect;

// Transaction schema
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").notNull(), // pending, completed, failed
  hash: text("hash"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  timestamp: true,
  hash: true,
});

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
