"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Column } from "./Column";
import { TaskDialog } from "./TaskDialog";

type TPriority = "low" | "medium" | "high";
type TTaskStatus = "todo" | "in-progress" | "done";

type TUser = {
  id: string;
  name: string;
  avatar?: string;
};

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
  assignee?: TUser;
};

type TColumn = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
};

const sampleUsers: TUser[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: "3",
    name: "Bob Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  },
];

interface IKanbanBoardProps {
  initialColumns: TColumn[];
  initialTasks: TTask[];
}

export function KanbanBoard({
  initialColumns,
  initialTasks,
}: IKanbanBoardProps) {
  const todoTasks = initialTasks.filter((task) => task.status === "todo");
  const inProgressTasks = initialTasks.filter(
    (task) => task.status === "in-progress"
  );
  const doneTasks = initialTasks.filter((task) => task.status === "done");

  return (
    <div className="flex gap-4 h-full p-4">
      <Column title="Todo" tasks={todoTasks} />
      <Column title="In Progress" tasks={inProgressTasks} />
      <Column title="Done" tasks={doneTasks} />

      <TaskDialog
        onSubmit={async () => {}}
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
