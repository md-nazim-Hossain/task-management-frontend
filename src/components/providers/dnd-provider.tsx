import { useUpdateTaskMutation } from "@/redux/api/task-api";
import type { IProject, ITask } from "@/types";
import { DndContext, DragOverlay, type DragEndEvent } from "@dnd-kit/core";
import React, { useState } from "react";
import Task from "../tasks/task";

type Props = {
  project?: IProject;
  refetch: () => void;
  children: React.ReactNode;
};
function DndProvider({ project, refetch, children }: Props) {
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const [updateTask] = useUpdateTaskMutation();
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    try {
      const formData = new FormData();
      formData.append("status", over.id.toString());
      await updateTask({
        id: active.id.toString(),
        body: formData,
      }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };
  return (
    <DndContext
      onDragStart={(event) => {
        const draggedId = event.active.id;
        const allTasks = project?.tasks || [];
        const found = allTasks.find((task) => task._id === draggedId);
        if (found) setActiveTask(found);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveTask(null)}
    >
      {children}
      <DragOverlay>
        {activeTask ? <Task task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default DndProvider;
