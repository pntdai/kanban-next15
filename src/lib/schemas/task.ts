import { z } from "zod";

export const taskPriorityEnum = z.enum(["low", "medium", "high"]);
export type TPriority = z.infer<typeof taskPriorityEnum>;

export const taskStatusEnum = z.enum(["todo", "in-progress", "done"]);
export type TTaskStatus = z.infer<typeof taskStatusEnum>;

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: taskPriorityEnum,
  assigneeId: z.string().uuid().optional(),
  status: taskStatusEnum,
});

export const createTaskSchema = taskSchema.omit({ status: true });
export type TCreateTask = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = taskSchema.extend({
  id: z.string().uuid(),
});
export type TUpdateTask = z.infer<typeof updateTaskSchema>;
