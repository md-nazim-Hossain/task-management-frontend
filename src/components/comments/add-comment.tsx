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
import { useCreateTaskCommentMutation } from "@/redux/api/task-comment-api";
import { toast } from "sonner";

type Props = {
  taskId: string;
};

function AddComment({ taskId }: Props) {
  const [createTaskComment] = useCreateTaskCommentMutation();
  const form = useForm<IAddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(data: IAddCommentSchema) {
    try {
      await createTaskComment({
        task: taskId as any,
        comment: data.comment,
      }).unwrap();
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
