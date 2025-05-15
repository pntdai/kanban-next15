"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { TaskDialog } from "./TaskDialog";

type TPriority = "low" | "medium" | "high";
type TTaskStatus = "todo" | "in-progress" | "done";

type TTask = {
  id: string;
  title: string;
  description: string | null;
  priority: TPriority;
  status: TTaskStatus;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;
};

interface IColumn {
  title: string;
  tasks: TTask[];
  onTaskUpdate?: () => void;
}

export function Column({ title, tasks, onTaskUpdate }: IColumn) {
  return (
    <div className="flex flex-col h-full bg-muted/50 rounded-lg">
      <div className="p-4 border-b">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-2 p-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description || undefined}
              priority={task.priority}
              status={task.status}
              onTaskUpdate={onTaskUpdate}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <TaskDialog
          onSubmit={onTaskUpdate}
          trigger={
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          }
        />
      </div>
    </div>
  );
}
