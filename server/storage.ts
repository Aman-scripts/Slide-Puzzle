import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { users, leaderboard, type User, type InsertUser, type LeaderboardEntry, type InsertLeaderboard } from "@shared/schema";
import { eq, asc } from "drizzle-orm";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const db = drizzle(pool);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createLeaderboardEntry(entry: InsertLeaderboard): Promise<LeaderboardEntry>;
  getLeaderboard(difficulty?: string, limit?: number): Promise<LeaderboardEntry[]>;
  getTopPlayersByDifficulty(difficulty: string): Promise<LeaderboardEntry | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createLeaderboardEntry(entry: InsertLeaderboard): Promise<LeaderboardEntry> {
    const result = await db.insert(leaderboard).values(entry).returning();
    return result[0];
  }

  async getLeaderboard(difficulty?: string, limit: number = 50): Promise<LeaderboardEntry[]> {
    let query = db.select().from(leaderboard);
    
    if (difficulty && difficulty !== "all") {
      query = query.where(eq(leaderboard.difficulty, difficulty)) as any;
    }
    
    const result = await query
      .orderBy(asc(leaderboard.timeSeconds), asc(leaderboard.moves))
      .limit(limit);
    
    return result;
  }

  async getTopPlayersByDifficulty(difficulty: string): Promise<LeaderboardEntry | undefined> {
    const result = await db.select()
      .from(leaderboard)
      .where(eq(leaderboard.difficulty, difficulty))
      .orderBy(asc(leaderboard.timeSeconds), asc(leaderboard.moves))
      .limit(1);
    
    return result[0];
  }
}

export const storage = new DatabaseStorage();
