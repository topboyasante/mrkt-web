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
import { ResetPassword } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  reset_email: string;
};

const formSchema = z.object({
  password: z.string().min(1, {
    message: "This is a required field.",
  }),
  auth_token: z.coerce.number().min(1000, {
    message: "A valid token must be four digits.",
  }),
});

export default function ResetPasswordForm({ reset_email }: Props) {
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      auth_token: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);
    ResetPassword({
      email: reset_email,
      new_password: values.password,
      auth_token: values.auth_token,
    })
      .then(() => {
        setIsSubmittingForm(false);
        router.push(`/sign-in`);
      })
      .catch((err) => {
        toast.error(`${err}`);
        setIsSubmittingForm(false);
      });
  }

  return (
    <div className="w-full bg-white px-5 py-8 rounded-xl">
      <div className="w-full">
        <div>
          MRKT
          <div className="my-5">
            <h5 className="text-primary">Reset Password</h5>
            <p className="text-neutral-500">
              Provide your new password and you&apos;re good to go!
            </p>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="auth_token"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Reset Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">Password</FormLabel>
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
          <Button type="submit" className="w-full">
            {isSubmittingForm ? <Loader /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
