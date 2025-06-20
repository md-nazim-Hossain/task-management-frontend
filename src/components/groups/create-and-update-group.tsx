import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmitButton,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  createAndUpdateGroupSchema,
  type ICreateAndUpdateGroupSchema,
} from "@/const/schema";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../ui/checkbox";
import type { IGroup } from "@/types";
import { toast } from "sonner";
import {
  useCreateGroupMutation,
  useUpdateGroupMutation,
} from "@/redux/api/group-api";
import { useState } from "react";
import CustomAvatarImage from "../shared/custom-avatar-image";
import { addHTTPPrefix } from "@/utils/image-loader";

type Props = {
  trigger: React.ReactNode;
  defaultValues?: Partial<IGroup>;
  isEdit?: boolean;
};

function CreateAndUpdateGroup({ trigger, isEdit, defaultValues }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<ICreateAndUpdateGroupSchema>({
    resolver: zodResolver(createAndUpdateGroupSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      image: defaultValues?.image ?? undefined,
      status: defaultValues?.status ?? false,
      members: defaultValues?.members ?? [],
    },
  });

  const [createGroup] = useCreateGroupMutation();
  const [updateGroup] = useUpdateGroupMutation();

  async function onSubmit(data: ICreateAndUpdateGroupSchema) {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description ?? "");
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      formData.append("status", data.status ? "true" : "false");
      if (isEdit) {
        await updateGroup({
          body: formData,
          id: defaultValues?._id as string,
        }).unwrap();
        toast.success("Group updated successfully");
      } else {
        await createGroup(data).unwrap();
        toast.success("Group created successfully");
      }
      form.reset();
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
      console.log(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>{isEdit ? "Update" : "Create New "} Group</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter group name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your task description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Group Cover Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (!e.target.files?.[0]) return;
                          onChange(e.target.files?.[0]);
                        }}
                      />
                      {form.watch("image") && (
                        <CustomAvatarImage
                          src={
                            value instanceof File
                              ? URL.createObjectURL(value)
                              : addHTTPPrefix(value)
                          }
                          withHttp={false}
                          alt={form.watch("title")}
                          className="h-28 w-48"
                          name={form.watch("title")}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      Publish
                    </FormLabel>
                  </FormItem>
                );
              }}
            />

            <DialogFooter>
              <FormSubmitButton
                loading={form.formState.isSubmitting}
                loadingText={isEdit ? "Updating..." : "Creating..."}
              >
                {isEdit ? "Update" : "Create"}
              </FormSubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAndUpdateGroup;
