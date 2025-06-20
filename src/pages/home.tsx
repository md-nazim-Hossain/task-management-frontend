import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import { useDashboardQuery } from "@/redux/api/auth-api";

function HomePage() {
  const { data, isLoading } = useDashboardQuery();
  if (isLoading)
    return (
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className="aspect-video shadow-lg flex-grow min-w-sm rounded-md border"
          />
        ))}
      </div>
    );
  const datas = data?.data ?? [];
  return (
    <div className="flex flex-wrap gap-4">
      {datas?.map((data, index) => (
        <div
          key={index}
          className="rounded-md flex flex-col gap-2 p-4 border shadow hover:shadow-lg duration-500 min-w-sm aspect-video justify-center items-center"
        >
          <Typography variant={"h3"}>{data?.title}</Typography>
          <Typography variant={"h4"}>{data?.value}</Typography>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
