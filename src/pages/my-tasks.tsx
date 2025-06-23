import SearchAndFilter from "@/components/shared/search-and-filter";
import MyTasks from "@/components/tasks/my-tasks";
import { useGetMyTasksQuery } from "@/redux/api/task-api";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function MyTasksPage() {
  const queryParams = useSelector((state: RootState) => state.queryParams);
  const { data, isLoading, isFetching } = useGetMyTasksQuery(queryParams);
  return (
    <div>
      <SearchAndFilter />
      <MyTasks data={data} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
}

export default MyTasksPage;
