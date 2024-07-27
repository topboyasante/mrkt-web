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
import { ForgotPassword } from "@/services/auth.services";
import { formatError } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
});

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [error, setError] = useState("");


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);
    await ForgotPassword(values.email)
      .then(() => {
        setIsSubmittingForm(false);
        router.push(`/reset-password?email=${values.email}`);
      })
      .catch((err) => {
        setError(`${err.message}`);
        setIsSubmittingForm(false);
      });
  }

  return (
    <div className="w-full bg-white px-5 py-8 rounded-xl">
      <div className="w-full">
        <div>
          MRKT
          <div className="my-5">
            <h5 className="text-primary">Forgot your password?</h5>
            <p className="text-neutral-500">
              Don&apos;t fret. Provide your email, and recover your account.
            </p>
          </div>
        </div>
        {error && (
          <div className="my-5 bg-red-500 rounded-md px-5 py-2 text-white flex items-center gap-2">
            <span>
              <CircleAlert />
            </span>
            <p>{formatError(error)}</p>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Email</FormLabel>
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
            <Button type="submit" className="w-full">
              {isSubmittingForm ? <Loader /> : "Submit"}
            </Button>
            <p className="text-sm dark:text-neutral-600">
              Forgot your email? Contact us on any of our socials.
            </p>
            <p className="text-sm text-neutral-600">
              Remember your password?{" "}
              <span className="font-semibold text-primary">
                <Link href={`/sign-in`} className="hover:underline">
                  Sign In
                </Link>
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
