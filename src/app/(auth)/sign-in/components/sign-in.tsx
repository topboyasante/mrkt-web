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
import { formatError } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password should be at least 8 characters",
  }),
});

function SignInForm() {
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);
    setError("");
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (res?.error) {
      setIsSubmittingForm(false);
      setError(`${res?.error}`);
    } else {
      setIsSubmittingForm(false);
      router.push("/");
    }
  }
  return (
    <div className="w-full bg-white px-5 py-8 rounded-xl">
      <div>
        MRKT
        <div className="mt-5">
          <h5 className="text-primary">Sign In</h5>
          <p className="text-neutral-500">Enter your credentials to use MRKT</p>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        autoFocus
                        disabled={isSubmittingForm}
                        className="pr-10" // Add padding to the right for the button
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 px-3 py-2 text-sm"
                        disabled={isSubmittingForm}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="w-fit mt-5 text-sm text-neutral-600 hover:text-red-500 hover:underline hover:underline-offset-4 hover:text-foreground ease duration-150">
              <Link href={`/forgot-password`}>Forgot Password?</Link>
            </p>
            <Button
              type="submit"
              className="w-full"
              size={"sm"}
              disabled={isSubmittingForm}
            >
              {isSubmittingForm ? <Loader /> : <div>Sign In</div>}
            </Button>
            <p className="text-sm text-neutral-600">
              By signing in, you agree to the{" "}
              <span className="text-primary hover:underline font-semibold ease duration-150 cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-primary hover:underline font-semibold ease duration-150 cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
            <p className="text-sm text-neutral-600 mt-2">
              Don&apos;t have an account?{" "}
              <span className="font-semibold text-primary">
                <Link href={`sign-up`} className="hover:underline">
                  Sign Up
                </Link>
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignInForm;
