import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const columns = pgTable("columns", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  priority: text("priority", { enum: ["low", "medium", "high"] }).notNull(),
  status: text("status", { enum: ["todo", "in-progress", "done"] }).notNull(),
  columnId: uuid("column_id")
    .references(() => columns.id)
    .notNull(),
  assigneeId: uuid("assignee_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
