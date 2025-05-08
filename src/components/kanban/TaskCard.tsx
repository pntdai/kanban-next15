"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TPriority = "low" | "medium" | "high";

type TTaskCard = {
  id: string;
  title: string;
  description?: string;
  priority: TPriority;
  className?: string;
};

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
}: TTaskCard) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="font-medium">{title}</div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-3 py-2 border-t flex justify-between">
        <div className="text-xs text-muted-foreground">
          #{id.substring(0, 6)}
        </div>
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
