import Column from "@/components/Column";
import Button from "../components/Button";
import { COLUMNS, INITZIAL_TASK } from "@/constants/Task.constants";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-700">Task Management</h1>
        <Button>Add Task</Button>
      </div>
      <div className="flex gap-8">
        {
          COLUMNS.map((column) => (
            <Column key={column.id} column={column} tasks={INITZIAL_TASK.filter((task) => task.status === column.id)} />
          ))
        }
      </div>
    </main>
  );
}
