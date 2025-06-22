import User from "@/components/users/user";
import UserSkeleton from "@/components/users/user-skeleton";
import { useGetMyUsersQuery } from "@/redux/api/user-api";

function Users() {
  const { data, isLoading } = useGetMyUsersQuery();
  if (isLoading)
    return (
      <div className="flex flex-wrap gap-4">
        {[...Array(4)].map((_, i) => (
          <UserSkeleton key={i} />
        ))}
      </div>
    );
  const users = data?.data || [];
  return (
    <div className="flex flex-wrap gap-4">
      {users.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  );
}

export default Users;
