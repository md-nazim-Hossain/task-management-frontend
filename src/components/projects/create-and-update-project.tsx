import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmitButton,
} from "@/components/ui/form";
import {
  createAndUpdateProjectSchema,
  type ICreateAndUpdateProjectSchema,
} from "@/const/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/redux/api/project-api";
import { toast } from "sonner";
import { useState } from "react";
import type { IProject } from "@/types";

type Props = {
  trigger: React.ReactNode;
  isEdit?: boolean;
  defaultValues?: Partial<IProject>;
};
function CreateAndUpdateProject({ trigger, isEdit, defaultValues }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<ICreateAndUpdateProjectSchema>({
    resolver: zodResolver(createAndUpdateProjectSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      status: defaultValues?.status ?? false,
    },
  });

  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  async function onSubmit(data: ICreateAndUpdateProjectSchema) {
    try {
      if (isEdit) {
        await updateProject({ ...data, _id: defaultValues?._id }).unwrap();
        toast.success("Project updated successfully");
      } else {
        await createProject(data).unwrap();
        toast.success("Project created successfully");
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
          <DialogTitle>{isEdit ? "Update" : "Create New"} Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your project name" {...field} />
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

export default CreateAndUpdateProject;
