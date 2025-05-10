"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Pencil, User } from "lucide-react";
import { useState } from "react";
import { TaskDialog } from "./TaskDialog";

type TPriority = "low" | "medium" | "high";

type TUser = {
  id: string;
  name: string;
  avatar?: string;
};

type TTaskStatus = "todo" | "in-progress" | "done";

type TTaskCard = {
  id: string;
  title: string;
  description?: string;
  priority: TPriority;
  assignee?: TUser;
  allUsers: TUser[];
  className?: string;
  onEdit?: (data: any) => void;
  status: TTaskStatus;
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
  assignee,
  allUsers,
  className,
  onEdit,
  status,
}: TTaskCard) {
  const [selectedAssignee, setSelectedAssignee] = useState<TUser | undefined>(
    assignee
  );

  const handleSelect = (userId: string) => {
    const user = allUsers.find((u) => u.id === userId);
    setSelectedAssignee(user);
  };

  const task = {
    id,
    title,
    description,
    priority,
    status,
    assignee,
  };

  return (
    <Card className={cn("group", className)}>
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="font-medium">{title}</div>
            {onEdit && (
              <TaskDialog
                task={task}
                users={allUsers}
                onSubmit={onEdit}
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
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="mt-3 pt-2 border-t">
          <Select value={selectedAssignee?.id} onValueChange={handleSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Unassigned">
                {selectedAssignee ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={selectedAssignee.avatar}
                        alt={selectedAssignee.name}
                      />
                      <AvatarFallback>
                        {selectedAssignee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{selectedAssignee.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-xs">Unassigned</span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {allUsers.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
