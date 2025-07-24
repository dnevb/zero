import { drizzle } from "drizzle-orm/sqlite-proxy";
import Database from "@tauri-apps/plugin-sql";
import * as schema from "./schema";

let sqliteDbInstance: Database | null = null;

async function getDbInstance(): Promise<Database> {
  if (!sqliteDbInstance) {
    sqliteDbInstance = await Database.load("sqlite:main.db");
  }
  return sqliteDbInstance;
}

export const db = drizzle<typeof schema>(
  async (sql, params, method) => {
    const sqlite = await getDbInstance();
    let rows: any[] = [];

    try {
      if (isSelectQuery(sql)) {
        rows = await sqlite.select(sql, params);
        rows = rows.map(Object.values);
      } else {
        await sqlite.execute(sql, params);
        rows = [];
      }
    } catch (e) {
      console.error("SQL Error:", e);
      throw e;
    }

    const result = method === "all" ? rows : rows[0];
    return { rows: result };
  },
  { schema: schema }
);

const selectRegex = /^\s*SELECT\b/i;
function isSelectQuery(sql: string): boolean {
  return selectRegex.test(sql);
}
