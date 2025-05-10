"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TaskCard } from "./TaskCard";

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
  description?: string;
  priority: TPriority;
  status: TTaskStatus;
  assignee?: TUser;
};

type TColumnProps = {
  title: string;
  tasks: TTask[];
  allUsers: TUser[];
  onEdit?: (data: any) => void;
  className?: string;
};

export function Column({
  title,
  tasks,
  allUsers,
  onEdit,
  className,
}: TColumnProps) {
  return (
    <Card className={cn("flex-1 min-w-[300px]", className)}>
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>{title}</span>
          <span className="text-muted-foreground">{tasks.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            assignee={task.assignee}
            allUsers={allUsers}
            status={task.status}
            onEdit={onEdit}
          />
        ))}
      </CardContent>
    </Card>
  );
}
