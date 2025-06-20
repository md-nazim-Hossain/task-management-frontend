import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { addCommentSchema, type IAddCommentSchema } from "@/const/schema";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import {
  useCreateTaskCommentMutation,
  useUpdateTaskCommentMutation,
} from "@/redux/api/task-comment-api";
import { toast } from "sonner";
import type { ITaskComment } from "@/types";

type Props = {
  taskId: string;
  isEdit?: boolean;
  comment?: Partial<ITaskComment>;
  onSuccess?: () => void;
};

function AddComment({ taskId, comment, isEdit, onSuccess }: Props) {
  const [createTaskComment] = useCreateTaskCommentMutation();
  const [updateTaskComment] = useUpdateTaskCommentMutation();
  const form = useForm<IAddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      comment: isEdit ? comment?.comment : "",
    },
  });

  async function onSubmit(data: IAddCommentSchema) {
    try {
      if (isEdit) {
        await updateTaskComment({
          ...data,
          _id: comment?._id as string,
        }).unwrap();
        toast.success("Comment updated successfully");
      } else {
        await createTaskComment({
          task: taskId as any,
          comment: data.comment,
        }).unwrap();
        toast.success("Comment created successfully");
      }
      if (onSuccess) onSuccess();
      form.reset();
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 justify-between"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="write your comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          size={"lg"}
        >
          <Send />
        </Button>
      </form>
    </Form>
  );
}

export default AddComment;
