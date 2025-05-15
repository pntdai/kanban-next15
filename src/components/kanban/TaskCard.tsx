import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { TaskDialog } from "./TaskDialog";

type TPriority = "low" | "medium" | "high";

type TTaskStatus = "todo" | "in-progress" | "done";

interface ITaskCard {
  id: string;
  title: string;
  description?: string;
  priority: TPriority;
  className?: string;
  status: TTaskStatus;
}

const priorityColors: Record<TPriority, string> = {
  low: "bg-green-500/20 text-green-600 dark:bg-green-500/10 dark:text-green-400",
  medium:
    "bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400",
  high: "bg-red-500/20 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

export function TaskCard({
  id,
  title,
  description,
  priority,
  className,
  status,
}: ITaskCard) {
  return (
    <Card className={cn("group", className)}>
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="font-medium">{title}</div>
            <TaskDialog
              task={{ id, title, description, priority, status }}
              onSubmit={async () => {}}
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Pencil className="h-3 w-3" />
                  <span className="sr-only">Edit task</span>
                </Button>
              }
            />
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-3 py-2 border-t flex justify-between">
        <Badge
          className={cn(
            "px-2 py-0.5 text-xs font-medium",
            priorityColors[priority]
          )}
        >
          {priority}
        </Badge>
      </CardFooter>
    </Card>
  );
}
