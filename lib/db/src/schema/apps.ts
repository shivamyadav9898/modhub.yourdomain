import { pgTable, text, integer, real, boolean, timestamp, uuid } from "drizzle-orm/pg-core";

export const appsTable = pgTable("apps", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  logoUrl: text("logo_url").notNull(),
  screenshots: text("screenshots").array().notNull().default([]),
  downloadUrl: text("download_url").notNull(),
  size: text("size").notNull(),
  version: text("version").notNull(),
  developer: text("developer").notNull(),
  rating: real("rating").notNull().default(0),
  downloads: integer("downloads").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AppRow = typeof appsTable.$inferSelect;
