import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tetrisScores = sqliteTable("tetris_scores", {
  playerId: text("player_id").primaryKey(),
  name: text("name").notNull(),
  score: integer("score").notNull().default(0),
  lines: integer("lines").notNull().default(0),
  level: integer("level").notNull().default(1),
  updatedAt: text("updated_at").notNull(),
});
