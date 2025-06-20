import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const ContainerSkeleton = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "p-3 h-max rounded-lg bg-blue-100 space-y-4 max-w-sm flex-grow",
        className
      )}
    >
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/2 rounded" />
          <Skeleton className="size-5 rounded" />
        </div>

        {/* Progress and count */}
        <div className="flex items-center justify-between gap-5">
          <Skeleton className="h-2 w-full rounded" />
          <Skeleton className="h-4 w-10 rounded" />
        </div>
      </div>

      {/* Task placeholders */}
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded" />
        ))}
      </div>

      {/* Bottom button */}
      <Skeleton className="h-8 w-24 rounded" />
    </div>
  );
};

export default ContainerSkeleton;
