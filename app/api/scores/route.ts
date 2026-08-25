import { env } from "cloudflare:workers";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: cors });
}

async function ensureTable() {
  if (!env.DB) throw new Error("排行榜数据库未连接");
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS tetris_scores (
    player_id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    lines INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    updated_at TEXT NOT NULL
  )`).run();
  return env.DB;
}

function cleanName(value: unknown) {
  return String(value ?? "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 16);
}

function safeInt(value: unknown, max: number) {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) ? Math.max(0, Math.min(max, n)) : 0;
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: cors });
}

export async function GET() {
  try {
    const db = await ensureTable();
    const result = await db.prepare(`SELECT player_id AS playerId, name, score, lines, level, updated_at AS updatedAt
      FROM tetris_scores ORDER BY score DESC, lines DESC, updated_at ASC LIMIT 50`).all();
    return json({ scores: result.results });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "排行榜读取失败" }, 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const playerId = String(body.playerId ?? "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
    const name = cleanName(body.name);
    const score = safeInt(body.score, 10_000_000);
    const lines = safeInt(body.lines, 10_000);
    const level = safeInt(body.level, 999);
    if (playerId.length < 8 || !name) return json({ error: "玩家信息不完整" }, 400);

    const db = await ensureTable();
    await db.prepare(`INSERT INTO tetris_scores (player_id, name, score, lines, level, updated_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(player_id) DO UPDATE SET
        name = excluded.name,
        score = CASE WHEN excluded.score > tetris_scores.score THEN excluded.score ELSE tetris_scores.score END,
        lines = CASE WHEN excluded.score > tetris_scores.score THEN excluded.lines ELSE tetris_scores.lines END,
        level = CASE WHEN excluded.score > tetris_scores.score THEN excluded.level ELSE tetris_scores.level END,
        updated_at = CASE WHEN excluded.score > tetris_scores.score THEN CURRENT_TIMESTAMP ELSE tetris_scores.updated_at END`).bind(playerId, name, score, lines, level).run();
    return json({ ok: true });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "成绩提交失败" }, 500);
  }
}
