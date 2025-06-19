import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  id: string;
  className?: string;
  children: React.ReactNode;
};
function DraggableItem({ id, className, children }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 10,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={cn("relative", { "cursor-grabbing": isDragging }, className)}
    >
      {children}
    </div>
  );
}

export default DraggableItem;
