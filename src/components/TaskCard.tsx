import { ITask } from "@/types/Task"

interface TaskCardProps{
    task: ITask;
    key?: string;
}

export default function TaskCard(props: TaskCardProps) {

    const { task, key } = props

    return(
        <div key={key} className="cursor-grab rounded-lg bg-neutral-50 p-4 shadow-sm hover:shadow-md">
            <h3 className="font-medium text-neutral-700">{task.title}</h3>
            <p className="mt-2 text-sm text-neutral-500">{task.description}</p>
        </div>
    )
}