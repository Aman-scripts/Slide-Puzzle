import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeaderboardSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/leaderboard", async (req, res) => {
    try {
      const data = insertLeaderboardSchema.parse(req.body);
      const entry = await storage.createLeaderboardEntry(data);
      res.json(entry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/leaderboard", async (req, res) => {
    try {
      const difficulty = req.query.difficulty as string | undefined;
      const entries = await storage.getLeaderboard(difficulty);
      res.json(entries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/leaderboard/top/:difficulty", async (req, res) => {
    try {
      const difficulty = req.params.difficulty;
      const topPlayer = await storage.getTopPlayersByDifficulty(difficulty);
      res.json(topPlayer || null);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
