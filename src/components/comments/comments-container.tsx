import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddComment from "./add-comment";
import { useGetTaskCommentsQuery } from "@/redux/api/task-comment-api";
import Comment from "./comment";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  trigger: React.ReactNode;
  taskName: string;
  description: string;
  taskId: string;
};
function CommentsContainer({
  trigger,
  description,
  taskName,
  className,
  taskId,
}: Props) {
  const { data, isLoading } = useGetTaskCommentsQuery(taskId);

  if (isLoading) return <div>Loading...</div>;
  const comments = data?.data || [];

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{taskName}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className={cn("space-y-4 p-4", className)}>
          {comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
        </div>
        <SheetFooter>
          <AddComment taskId={taskId} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CommentsContainer;
