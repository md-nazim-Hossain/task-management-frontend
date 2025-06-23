import ContainerSkeleton from "@/components/shared/container-skeleton";
import SearchAndFilter from "@/components/shared/search-and-filter";
import MyTasks from "@/components/tasks/my-tasks";
import { useGetTasksByProjectQuery } from "@/redux/api/task-api";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function MyTasksPage() {
  const params = useParams();
  const queryParams = useSelector((state: RootState) => state.queryParams);
  const { data, isLoading, isFetching, refetch } = useGetTasksByProjectQuery({
    slug: params.slug,
    ...queryParams,
  });
  return (
    <div>
      <SearchAndFilter />
      {isLoading || isFetching ? (
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          {[...Array(4)].map((_, i) => (
            <ContainerSkeleton key={i} />
          ))}
        </div>
      ) : (
        <MyTasks onUpdateTask={() => refetch()} data={data} />
      )}
    </div>
  );
}

export default MyTasksPage;
