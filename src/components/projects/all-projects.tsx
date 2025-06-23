import { useGetProjectsQuery } from "@/redux/api/project-api";
import { Skeleton } from "../ui/skeleton";
import { SelectItem } from "../ui/select";

function AllProjects() {
  const { data, isLoading } = useGetProjectsQuery({});
  if (isLoading) return <Skeleton className="h-12 w-full" />;
  const projects = data?.data || [];
  return (
    <>
      {projects.map((category) => (
        <SelectItem key={category._id} value={category._id}>
          {category.title}
        </SelectItem>
      ))}
    </>
  );
}

export default AllProjects;
