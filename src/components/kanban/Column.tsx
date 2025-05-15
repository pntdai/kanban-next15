"use client";

import { TaskCard } from "./TaskCard";

type TPriority = "low" | "medium" | "high";
type TTaskStatus = "todo" | "in-progress" | "done";

type TTask = {
  id: string;
  title: string;
  description: string | null;
  priority: TPriority;
  status: TTaskStatus;
  columnId: string;
  assigneeId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

interface IColumnProps {
  title: string;
  tasks: TTask[];
}

export function Column({ title, tasks }: IColumnProps) {
  return (
    <div className="flex-1 min-w-[300px] bg-muted/50 rounded-lg p-4">
      <h2 className="font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description ?? undefined}
            priority={task.priority}
            status={task.status}
          />
        ))}
      </div>
    </div>
  );
}
