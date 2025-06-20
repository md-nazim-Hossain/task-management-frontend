import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const GroupSkeleton = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "border bg-background shadow rounded-md p-4 min-w-xs max-w-sm space-y-4",
        className
      )}
    >
      {/* Header: Avatar + title + actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-5 w-32 rounded" />
        </div>
        <Skeleton className="size-5 rounded" />
      </div>

      {/* Description */}
      <Skeleton className="h-4 w-3/4 rounded" />

      {/* Members */}
      <div>
        <Skeleton className="h-4 w-16 mb-2 rounded" />
        <div className="flex items-center space-x-[-8px]">
          {[1, 2, 3].map((_, i) => (
            <Skeleton
              key={i}
              className="size-7 rounded-full border-2 border-white shadow-sm"
            />
          ))}
          <Skeleton className="size-7 rounded-full border-2 border-white shadow-sm" />
        </div>
      </div>

      {/* Creator & Created Date */}
      <div className="pt-2 border-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
        <Skeleton className="h-3 w-16 rounded" />
      </div>
    </div>
  );
};

export default GroupSkeleton;
