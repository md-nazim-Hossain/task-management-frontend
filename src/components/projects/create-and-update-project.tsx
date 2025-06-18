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
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  trigger: React.ReactNode;
};
function CreateAndUpdateProject({ trigger }: Props) {
  const form = useForm<ICreateAndUpdateProjectSchema>({
    resolver: zodResolver(createAndUpdateProjectSchema),
  });

  async function onSubmit(data: ICreateAndUpdateProjectSchema) {
    console.log(data);
  }
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                loadingText="Submitting"
              >
                Submit
              </FormSubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAndUpdateProject;
