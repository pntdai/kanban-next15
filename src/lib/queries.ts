"use server";

import { db } from "@/db";
import { columns, tasks } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { createTaskSchema, type TCreateTask } from "./schemas/task";

const DEFAULT_COLUMNS = ["Todo", "In Progress", "Done"] as const;

async function ensureDefaultColumns() {
  try {
    // Get existing columns
    const existingColumns = await db.select().from(columns);
    const existingTitles = new Set(existingColumns.map((col) => col.title));

    // Create missing columns
    const newColumns = DEFAULT_COLUMNS.filter(
      (title) => !existingTitles.has(title)
    );

    if (newColumns.length > 0) {
      await db.insert(columns).values(
        newColumns.map((title) => ({
          id: uuidv4(),
          title,
        }))
      );
    }

    // Return all columns
    return await db.select().from(columns);
  } catch (error) {
    console.error("Error ensuring default columns:", error);
    throw new Error("Failed to initialize columns");
  }
}

export async function getColumns() {
  try {
    const columnsData = await ensureDefaultColumns();
    return { data: columnsData, error: null };
  } catch (error) {
    console.error("Error fetching columns:", error);
    return { data: null, error: "Failed to fetch columns" };
  }
}

export async function getTasks() {
  try {
    const tasksData = await db
      .select()
      .from(tasks)
      .orderBy(desc(tasks.createdAt));
    return { data: tasksData, error: null };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return { data: null, error: "Failed to fetch tasks" };
  }
}

export async function createTask(data: TCreateTask) {
  try {
    // Validate data
    const validatedData = createTaskSchema.parse(data);

    // Ensure default columns exist and get the todo column
    const allColumns = await ensureDefaultColumns();
    const todoColumn = allColumns.find((col) => col.title === "Todo");

    if (!todoColumn) {
      return { data: null, error: "Todo column not found" };
    }

    // Create task
    const [task] = await db
      .insert(tasks)
      .values({
        id: uuidv4(),
        title: validatedData.title,
        description: validatedData.description || null,
        priority: validatedData.priority,
        status: "todo", // Default status for new tasks
        assigneeId: validatedData.assigneeId || null,
        columnId: todoColumn.id,
      })
      .returning();

    // Revalidate the kanban page
    revalidatePath("/kanban");

    return { data: task, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
    return { data: null, error: "Failed to create task" };
  }
}
