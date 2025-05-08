"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, User, UserPlus } from "lucide-react";
import { useState } from "react";

type TPriority = "low" | "medium" | "high";

type TUser = {
  id: string;
  name: string;
  avatar?: string;
};

type TTaskCard = {
  id: string;
  title: string;
  description?: string;
  priority: TPriority;
  assignee?: TUser;
  allUsers: TUser[];
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
  assignee,
  allUsers,
  className,
}: TTaskCard) {
  const [open, setOpen] = useState(false);

  const [selectedAssignee, setSelectedAssignee] = useState<TUser | undefined>(
    assignee
  );

  const handleSelect = (user: TUser) => {
    setSelectedAssignee(user);
    setOpen(false);
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="font-medium">{title}</div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="mt-3 pt-2 border-t">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between"
              >
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
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start" side="right">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandList>
                  <CommandEmpty>No users found.</CommandEmpty>
                  <CommandGroup>
                    {allUsers.map((user) => (
                      <CommandItem
                        key={user.id}
                        onSelect={() => handleSelect(user)}
                        className="flex items-center gap-2"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                        {selectedAssignee?.id === user.id && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
