import { Kyselify } from "drizzle-orm/kysely";
import { CamelCasePlugin, Kysely, SqliteDialect } from "kysely";
import { TUser } from "~/schema/user";
import { remember } from "@epic-web/remember";

import SQLite from "better-sqlite3";

interface Database {
  user: Kyselify<TUser>;
}

let DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  console.warn("Missing DATABASE_URL environment variable. Using local file");
  DB_URL = "file:./db.sqlite";
}

const dialect = new SqliteDialect({
  database: new SQLite(DB_URL),
});

export const db = remember(
  "db",
  () =>
    new Kysely<Database>({
      dialect,
      plugins: [new CamelCasePlugin()],
    })
);
