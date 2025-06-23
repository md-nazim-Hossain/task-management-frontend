import ContainerSkeleton from "@/components/shared/container-skeleton";
import SearchAndFilter from "@/components/shared/search-and-filter";
import MyTasks from "@/components/tasks/my-tasks";
import { useGetMyTasksQuery } from "@/redux/api/task-api";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function MyTasksPage() {
  const queryParams = useSelector((state: RootState) => state.queryParams);
  const { data, isLoading, isFetching, refetch } =
    useGetMyTasksQuery(queryParams);
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
