import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useUpdateGroupMutation } from "@/redux/api/group-api";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmitButton,
} from "@/components/ui/form";
import type { IGroup } from "@/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useGetUsersQuery } from "@/redux/api/user-api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  members: z.array(z.string()).min(1, {
    message: "Please select at least one member",
  }),
});
type IFormSchema = z.infer<typeof formSchema>;
type Props = {
  trigger: React.ReactNode;
  group: IGroup;
};
const AddMembersModal = ({ trigger, group }: Props) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetUsersQuery({
    status: true,
  } as any);
  const [updateGroup] = useUpdateGroupMutation();

  const defaultMemberIds = group?.members?.map((m) => m._id) ?? [];

  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      members: defaultMemberIds,
    },
  });

  const onSubmit = async (values: IFormSchema) => {
    try {
      await updateGroup({
        members: values.members as any,
        _id: group?._id,
      }).unwrap();
      toast.success("Members updated");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const users = data?.data || [];
  const filteredUsers = users
    .filter((user) => group.creator?._id !== user._id)
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Group Members</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Search members by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {isLoading && <Typography>Loading users...</Typography>}

            {!isLoading && users?.length === 0 && (
              <Typography>No users found</Typography>
            )}

            <FormField
              control={form.control}
              name="members"
              render={() => (
                <FormItem>
                  <FormLabel>Add Members</FormLabel>
                  <div>
                    {filteredUsers.map((item) => (
                      <FormField
                        key={item._id}
                        control={form.control}
                        name="members"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item._id}
                              className="flex flex-row items-center gap-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item._id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value || []),
                                          item._id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item._id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.fullName}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <FormSubmitButton
                loadingText="Adding..."
                loading={form.formState.isSubmitting}
              >
                Add
              </FormSubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMembersModal;
