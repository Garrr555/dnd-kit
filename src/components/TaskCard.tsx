import { ITask } from "@/types/Task";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  task: ITask;
  key?: string;
}

export default function TaskCard(props: TaskCardProps) {
  const { task, key } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
  } : undefined

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      key={key}
      style={style}
      className="cursor-grab rounded-lg bg-neutral-50 p-4 shadow-sm hover:shadow-md"
    >
      <h3 className="font-medium text-neutral-700">{task.title}</h3>
      <p className="mt-2 text-sm text-neutral-500">{task.description}</p>
    </div>
  );
}
