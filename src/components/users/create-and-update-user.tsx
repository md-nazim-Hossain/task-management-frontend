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
import { addUserSchema, updateUserSchema } from "@/const/schema";
import { Checkbox } from "../ui/checkbox";
import type { IUser } from "@/types";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/redux/api/user-api";
import { useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import CustomAvatarImage from "../shared/custom-avatar-image";
import { addHTTPPrefix } from "@/utils/image-loader";

type Props = {
  trigger: React.ReactNode;
  isEdit?: boolean;
  defaultValues?: Partial<IUser>;
};

function CreateAndUpdateUser({ trigger, isEdit, defaultValues }: Props) {
  const [open, setOpen] = useState(false);
  const formSchema = !isEdit ? addUserSchema : updateUserSchema;
  type FormSchemaType = z.infer<typeof formSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      email: defaultValues?.email ?? "",
      profileImage: defaultValues?.profileImage ?? "",
      status: defaultValues?.status ?? false,
      password: "",
    },
  });

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  async function onSubmit(data: FormSchemaType) {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("status", data.status ? "true" : "false");

      if (data.profileImage instanceof File) {
        formData.append("profileImage", data.profileImage);
      }

      if (isEdit && defaultValues?._id) {
        await updateUser({ id: defaultValues._id, body: formData }).unwrap();
        toast.success("User updated successfully");
      } else {
        formData.append("password", (data as any)?.password);
        await createUser(formData).unwrap();
        toast.success("User created successfully");
      }

      form.reset();
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>{isEdit ? "Update" : "Create New"} User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!isEdit && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your confirm password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="profileImage"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (!e.target.files?.[0]) return;
                          onChange(e.target.files?.[0]);
                        }}
                      />
                      {form.watch("profileImage") && (
                        <CustomAvatarImage
                          src={
                            value instanceof File
                              ? URL.createObjectURL(value)
                              : addHTTPPrefix(value)
                          }
                          withHttp={false}
                          alt={form.watch("fullName")}
                          className="h-28 w-48"
                          name={form.watch("fullName")}
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
                      Active
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

export default CreateAndUpdateUser;
