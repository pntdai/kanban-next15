import { getColumns, getTasks } from "@/lib/queries";
import { KanbanBoard } from "./KanbanBoard";

export async function KanbanBoardWrapper() {
  const { data: columnsData, error: columnsError } = await getColumns();
  const { data: tasksData, error: tasksError } = await getTasks();

  if (columnsError || tasksError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">Failed to load data</p>
      </div>
    );
  }

  return (
    <KanbanBoard
      initialColumns={columnsData ?? []}
      initialTasks={tasksData ?? []}
    />
  );
}
