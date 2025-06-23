import SearchAndFilter from "@/components/shared/search-and-filter";
import MyTasks from "@/components/tasks/my-tasks";
import { useGetTasksByProjectQuery } from "@/redux/api/task-api";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function MyTasksPage() {
  const params = useParams();
  const queryParams = useSelector((state: RootState) => state.queryParams);
  const { data, isLoading, isFetching } = useGetTasksByProjectQuery({
    slug: params.slug,
    ...queryParams,
  });
  return (
    <div>
      <SearchAndFilter />
      <MyTasks data={data} isLoading={isLoading} isFetching={isFetching} />
    </div>
  );
}

export default MyTasksPage;
