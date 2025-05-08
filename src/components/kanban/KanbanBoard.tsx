"use client";

import { Column } from "./Column";
import { TaskCard } from "./TaskCard";

type TTask = {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
};

interface IKanbanData {
  tasks: TTask[];
  users: {
    id: string;
    name: string;
    avatar?: string;
  }[];
}

// Sample data for demonstration
const initialData: IKanbanData = {
  users: [
    {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "https://ui.shadcn.com/avatars/01.png",
    },
    {
      id: "user-2",
      name: "Taylor Smith",
      avatar: "https://ui.shadcn.com/avatars/02.png",
    },
    {
      id: "user-3",
      name: "Jordan Casey",
      avatar: "https://ui.shadcn.com/avatars/03.png",
    },
    {
      id: "user-4",
      name: "Morgan Riley",
      avatar: "https://ui.shadcn.com/avatars/04.png",
    },
    {
      id: "user-5",
      name: "Jamie Quinn",
      avatar: "https://ui.shadcn.com/avatars/05.png",
    },
  ],
  tasks: [
    {
      id: "task-1",
      title: "Implement authentication",
      description: "Set up user login and registration",
      priority: "high",
      status: "todo",
      assignee: {
        id: "user-1",
        name: "Alex Johnson",
        avatar: "https://ui.shadcn.com/avatars/01.png",
      },
    },
    {
      id: "task-2",
      title: "Design dashboard",
      description: "Create wireframes for the main dashboard",
      priority: "medium",
      status: "todo",
      assignee: {
        id: "user-3",
        name: "Jordan Casey",
        avatar: "https://ui.shadcn.com/avatars/03.png",
      },
    },
    {
      id: "task-3",
      title: "API integration",
      description: "Connect to the backend API endpoints",
      priority: "high",
      status: "in-progress",
      assignee: {
        id: "user-2",
        name: "Taylor Smith",
        avatar: "https://ui.shadcn.com/avatars/02.png",
      },
    },
    {
      id: "task-4",
      title: "Set up testing",
      description: "Configure Jest and write initial tests",
      priority: "medium",
      status: "in-progress",
      assignee: {
        id: "user-4",
        name: "Morgan Riley",
        avatar: "https://ui.shadcn.com/avatars/04.png",
      },
    },
    {
      id: "task-5",
      title: "Mobile responsiveness",
      description: "Ensure the app works well on all devices",
      priority: "low",
      status: "in-progress",
    },
    {
      id: "task-6",
      title: "Documentation",
      description: "Write user and developer documentation",
      priority: "low",
      status: "done",
      assignee: {
        id: "user-5",
        name: "Jamie Quinn",
        avatar: "https://ui.shadcn.com/avatars/05.png",
      },
    },
    {
      id: "task-7",
      title: "Fix navigation bugs",
      description: "Address issues with the navigation menu",
      priority: "medium",
      status: "done",
    },
  ],
};

export function KanbanBoard() {
  const todoTasks = initialData.tasks.filter((task) => task.status === "todo");
  const inProgressTasks = initialData.tasks.filter(
    (task) => task.status === "in-progress"
  );
  const doneTasks = initialData.tasks.filter((task) => task.status === "done");
  const allUsers = initialData.users;

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full w-full">
      <Column title="Todo" count={todoTasks.length} className="bg-card/50">
        {todoTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            assignee={task.assignee}
            allUsers={allUsers}
          />
        ))}
      </Column>

      <Column
        title="In Progress"
        count={inProgressTasks.length}
        className="bg-card/50"
      >
        {inProgressTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            assignee={task.assignee}
            allUsers={allUsers}
          />
        ))}
      </Column>

      <Column title="Done" count={doneTasks.length} className="bg-card/50">
        {doneTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            assignee={task.assignee}
            allUsers={allUsers}
          />
        ))}
      </Column>
    </div>
  );
}
