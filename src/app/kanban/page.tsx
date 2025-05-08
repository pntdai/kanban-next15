import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { ThemeToggle } from "@/components/theme-toggle";

export default function KanbanPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">Kanban Board</h1>
        <ThemeToggle />
      </header>

      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <KanbanBoard />
      </main>

      <footer className="border-t px-4 py-3 text-center text-sm text-muted-foreground">
        Kanban Board with Next.js 15, React 19, and Shadcn UI
      </footer>
    </div>
  );
}
