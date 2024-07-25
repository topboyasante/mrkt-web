"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { ChangePassword } from "@/services/user.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  prev_password: z.string().min(1, {
    message: "field must not be empty",
  }),
  new_password: z.string().min(1, {
    message: "field must not be empty",
  }),
});

function Security() {
  const router = useRouter();
  const session = useSession();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prev_password: "",
      new_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);
    try {
      await ChangePassword(values, session.data?.user.access_token as string);
      signOut({ redirect: false }).then(() => {
        router.push("/");
      });
      toast.success("Password has been changed. Please log in.")
    } catch (err) {
      toast.error(`${err}`);
    } finally {
      setIsSubmittingForm(false);
    }
  }

  return (
    <div>
      <div>
        <h4>Change Password</h4>
        <br />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="prev_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">
                    Previous Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      autoFocus
                      disabled={isSubmittingForm}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      disabled={isSubmittingForm}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              size={"sm"}
              disabled={isSubmittingForm}
            >
              {isSubmittingForm ? <Loader /> : <div>Change Password</div>}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Security;
