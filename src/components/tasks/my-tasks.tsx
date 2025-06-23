import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import type {
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import Container from "@/components/shared/container";
import Task from "@/components/tasks/task";
import { useUpdateTaskMutation } from "@/redux/api/task-api";
import type { IAPIResponse, ITask } from "@/types";
import { toast } from "sonner";

const STATUSES = ["todo", "in_progress", "completed"];

type Props = {
  data: IAPIResponse<ITask[]> | undefined;
  onUpdateTask?: () => void;
};

function MyTasks({ data, onUpdateTask }: Props) {
  const tasks = data?.data || [];
  const [updateTask] = useUpdateTaskMutation();

  // Group tasks by status
  const groupTasks = STATUSES.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {} as Record<string, ITask[]>);

  const [columns, setColumns] = useState(groupTasks);
  const [activeItem, setActiveItem] = useState<ITask | null>(null);
  const [originalContainer, setOriginalContainer] = useState<string | null>(
    null
  );
  const [currentContainer, setCurrentContainer] = useState<string | null>(null);

  const findContainer = (id: string) =>
    Object.keys(columns).find((key) =>
      columns[key].some((task) => task._id === id)
    );

  const getContainerId = (id: string | undefined): string | undefined => {
    if (!id) return undefined;
    if (STATUSES.includes(id)) return id;
    return findContainer(id);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const draggedId = event.active.id;
    const task = tasks.find((t) => t._id === draggedId);
    if (task) setActiveItem(task);

    const containerId = findContainer(draggedId as string);
    setOriginalContainer(containerId ?? null);
    setCurrentContainer(containerId ?? null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = getContainerId(active.id as string);
    const overContainer = getContainerId(over.id as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    setColumns((prev) => {
      const activeItems = [...prev[activeContainer]];
      const overItems = [...prev[overContainer]];

      const itemIndex = activeItems.findIndex((task) => task._id === active.id);
      if (itemIndex === -1) return prev;

      const [movedItem] = activeItems.splice(itemIndex, 1);
      overItems.unshift(movedItem);

      return {
        ...prev,
        [activeContainer]: activeItems,
        [overContainer]: overItems,
      };
    });

    setCurrentContainer(overContainer);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);
    if (!over) return;

    if (!originalContainer || !currentContainer) return;

    if (originalContainer === currentContainer) return;

    const formData = new FormData();
    formData.append("status", currentContainer);

    try {
      await updateTask({
        id: active.id.toString(),
        body: formData,
      }).unwrap();
      if (onUpdateTask) onUpdateTask();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
    setOriginalContainer(null);
    setCurrentContainer(null);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-row flex-wrap gap-10">
        {Object.entries(columns).map(([status, tasks]) => (
          <Container
            id={status}
            value={0}
            key={status}
            hideProjectAction
            project={
              {
                title: "",
                slug: status,
                _id: "",
              } as any
            }
            title={status.replace("_", " ")}
            tasks={tasks}
            className="flex-grow sm:min-w-sm max-w-md h-max"
            render={(task) =>
              task._id === activeItem?._id ? null : (
                <Task task={task} id={task._id as string} key={task._id} />
              )
            }
          />
        ))}
      </div>

      <DragOverlay>
        {activeItem ? <Task id={activeItem._id} task={activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default MyTasks;
