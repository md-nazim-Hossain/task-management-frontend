import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmitButton,
} from "@/components/ui/form";
import { loginSchema, type ILoginSchema } from "@/const/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/api/auth-api";
import { toast } from "sonner";
import { setUser } from "@/redux/slices/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function LoginPage() {
  const navigate = useNavigate();
  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  async function onSubmit(data: ILoginSchema) {
    try {
      const res = await login(data).unwrap();
      if (!res?.data) throw new Error("Something went wrong");
      const { user } = res?.data || {};
      dispatch(setUser(user || null));
      navigate("/");
      toast.success("Login successful");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-2xl mx-auto"
        >
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
          <div className="flex justify-end">
            <FormSubmitButton
              loading={form.formState.isSubmitting}
              loadingText="Logging in..."
            >
              Login
            </FormSubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default LoginPage;
