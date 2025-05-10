"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  description?: string;
  priority: TPriority;
  status: TTaskStatus;
  assignee?: TUser;
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

const sampleTasks: TTask[] = [
  {
    id: "1",
    title: "Implement user authentication",
    description: "Add login and registration functionality",
    priority: "high",
    status: "todo",
    assignee: sampleUsers[0],
  },
  {
    id: "2",
    title: "Design dashboard layout",
    description: "Create responsive dashboard with charts",
    priority: "medium",
    status: "in-progress",
    assignee: sampleUsers[1],
  },
  {
    id: "3",
    title: "Write API documentation",
    description: "Document all API endpoints",
    priority: "low",
    status: "done",
    assignee: sampleUsers[2],
  },
  {
    id: "4",
    title: "Fix navigation bugs",
    description: "Resolve issues with mobile navigation",
    priority: "high",
    status: "todo",
  },
  {
    id: "5",
    title: "Optimize database queries",
    description: "Improve query performance",
    priority: "medium",
    status: "in-progress",
    assignee: sampleUsers[0],
  },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState<TTask[]>(sampleTasks);

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  const handleCreateTask = (data: TTask) => {
    const newTask: TTask = {
      ...data,
      id: uuidv4(),
    };
    console.log("newTask", newTask);
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (data: TTask) => {
    setTasks(
      tasks.map((task) => (task.id === data.id ? { ...task, ...data } : task))
    );
  };

  return (
    <div className="flex gap-4 h-full p-4">
      <Column
        title="Todo"
        tasks={todoTasks}
        allUsers={sampleUsers}
        onEdit={handleEditTask}
      />
      <Column
        title="In Progress"
        tasks={inProgressTasks}
        allUsers={sampleUsers}
        onEdit={handleEditTask}
      />
      <Column
        title="Done"
        tasks={doneTasks}
        allUsers={sampleUsers}
        onEdit={handleEditTask}
      />

      <TaskDialog
        users={sampleUsers}
        onSubmit={handleCreateTask}
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
