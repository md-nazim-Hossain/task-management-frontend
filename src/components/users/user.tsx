import { cn } from "@/lib/utils";
import type { IUser } from "@/types";
import CustomAvatarImage from "../shared/custom-avatar-image";
import { Typography } from "../ui/typography";
import { Badge } from "../ui/badge";
import CreateAndUpdateUser from "./create-and-update-user";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import AlertModal from "../shared/alert-modal";
import { useDeleteUserMutation } from "@/redux/api/user-api";
import { toast } from "sonner";

type Props = {
  user: IUser;
  className?: string;
  totalUsers: number;
};
function User({ user, className, totalUsers }: Props) {
  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = async () => {
    try {
      await deleteUser(user._id as string).unwrap();
      toast.success("User deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div
      className={cn(
        "flex-grow shadow max-w-sm border p-4 rounded-lg",
        className
      )}
    >
      <div className="flex flex-col gap-2 items-center">
        <CustomAvatarImage
          src={user?.profileImage as string}
          alt={user?.fullName}
          name={user?.fullName}
          className="size-20 rounded-full"
        />
        <Typography variant={"h4"}>{user?.fullName}</Typography>
        <Typography variant={"small"}>{user?.email}</Typography>
        <Badge variant={user?.status ? "success" : "destructive"}>
          {user?.status ? "Active" : "Inactive"}
        </Badge>
        <Separator className="my-2" />
        <div className="flex items-center gap-2">
          <CreateAndUpdateUser
            defaultValues={user}
            isEdit
            trigger={
              <Button size={"icon"}>
                <Edit />
              </Button>
            }
          />
          {totalUsers > 1 && (
            <AlertModal
              onConfirm={handleDelete}
              trigger={
                <Button variant={"destructive"} size={"icon"}>
                  <Trash2 />
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
