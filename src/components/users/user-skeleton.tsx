import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const UserSkeleton = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex-grow shadow max-w-sm border p-4 rounded-lg",
        className
      )}
    >
      <div className="flex flex-col gap-2 items-center">
        <Skeleton className="size-20 rounded-full" />
        <Skeleton className="h-5 w-32 rounded" />
        <Skeleton className="h-4 w-40 rounded" />
        <Skeleton className="h-6 w-16 rounded" />
        <div className="w-full my-2">
          <Skeleton className="h-px w-full bg-border" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded" />
          <Skeleton className="h-10 w-10 rounded bg-destructive/30" />
        </div>
      </div>
    </div>
  );
};

export default UserSkeleton;
