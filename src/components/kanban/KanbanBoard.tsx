"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Column } from "./Column";
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

type TColumn = {
  id: string;
  title: string;
};

interface IKanbanBoardProps {
  initialColumns: TColumn[];
  initialTasks: TTask[];
}

export function KanbanBoard({
  initialColumns,
  initialTasks,
}: IKanbanBoardProps) {
  const router = useRouter();

  const handleTaskUpdate = () => {
    router.refresh();
  };

  const todoTasks = initialTasks.filter((task) => task.status === "todo");
  const inProgressTasks = initialTasks.filter(
    (task) => task.status === "in-progress"
  );
  const doneTasks = initialTasks.filter((task) => task.status === "done");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <Column
          title="Todo"
          tasks={todoTasks}
          onTaskUpdate={handleTaskUpdate}
        />
        <Column
          title="In Progress"
          tasks={inProgressTasks}
          onTaskUpdate={handleTaskUpdate}
        />
        <Column
          title="Done"
          tasks={doneTasks}
          onTaskUpdate={handleTaskUpdate}
        />
      </div>

      <TaskDialog
        onSubmit={handleTaskUpdate}
        trigger={
          <Button className="fixed bottom-4 right-4">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        }
      />
    </div>
  );
}
