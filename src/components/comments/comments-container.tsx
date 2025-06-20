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
import type { ITaskComment } from "@/types";

type Props = {
  className?: string;
  trigger: React.ReactNode;
  taskName: string;
  description: string;
  taskComment?: ITaskComment;
};
function CommentsContainer({
  trigger,
  description,
  taskName,
  className,
  taskComment,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{taskName}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <AddComment taskId={"1"} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CommentsContainer;
