"use client";

import Column from "@/components/Column";
import Button from "../components/Button";
import { COLUMNS, INITZIAL_TASK } from "@/constants/Task.constants";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { FormEvent, useEffect, useState } from "react";
import { ITask } from "@/types/Task";
import ModalTask from "@/components/ModalTask";

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([...INITZIAL_TASK]);
  const [showModalAddTask, setShowModalAddTask] = useState(false);

  //load tasks form initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  //save changes tasks to localstorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as ITask["status"];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleCreateTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newTask: ITask = {
      id: Math.random().toString(36).substring(2, 9),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: "TODO",
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    
    event.currentTarget.reset();
    setShowModalAddTask(false);
    }

  return (
    <main className="min-h-screen p-4 flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-700">Task Management</h1>
        <Button onClick={() => setShowModalAddTask(true)} className="bg-blue-500">Add Task</Button>
      </div>
      <div className="flex gap-8 flex-1">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </DndContext>
      </div>

      {showModalAddTask && (
        <ModalTask
          onCancel={() => setShowModalAddTask(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </main>
  );
}
