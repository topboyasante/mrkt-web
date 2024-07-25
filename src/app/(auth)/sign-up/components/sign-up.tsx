"use client";
import { Button } from "@/components/ui/button";
import CountrySelect from "@/components/ui/country-select";
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
import { SignUp } from "@/services/auth.services";
import { formatError } from "@/utils/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Eye, EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: "Field cannot be empty",
  }),
  last_name: z.string().min(1, {
    message: "Field cannot be empty",
  }),
  email: z.string().email({
    message: "Provide a valid email",
  }),
  country: z
    .object({
      country_code: z
        .string()
        .min(1, { message: "Provide a valid country code" })
        .max(2, { message: "Country code must be 2 characters" }),
      calling_code: z
        .string()
        .min(1, { message: "Provide a valid calling code" })
        .max(4, { message: "Calling code must be up to 4 characters" }),
    })
    .refine((data) => data.country_code && data.calling_code, {
      message: "Provide a valid country",
    }),
  phone_number: z.string().min(1, {
    message: "Provide a valid phone number",
  }),
  password: z.string().min(8, {
    message: "Password should be at least 8 characters",
  }),
});

function SignUpForm() {
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      country: {
        country_code: "",
        calling_code: "",
      },
      phone_number: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);
    setError("");
    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      phone_number: values.phone_number,
      country_code: values.country.country_code,
      calling_code: values.country.calling_code,
    };
    await SignUp(payload)
      .then(() => {
        setIsSubmittingForm(false);
        router.push(`/activate-account?email=${values.email}`);
      })
      .catch((err) => {
        setError(`${err.message}`);
        setIsSubmittingForm(false);
      });
  }

  return (
    <div className="w-full bg-white px-5 py-8 rounded-xl">
      <div>
        MRKT
        <div className="my-5">
          <h5 className="text-primary">Welcome to MRKT!</h5>
          <p className="text-neutral-500">
            Let&apos;s get you started. Sign up.
          </p>
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
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">First Name</FormLabel>
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
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Last Name</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
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
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Country</FormLabel>
                  <FormControl>
                    <CountrySelect
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Phone Number</FormLabel>
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
            <Button
              type="submit"
              className="w-full"
              size={"sm"}
              disabled={isSubmittingForm}
            >
              {isSubmittingForm ? <Loader /> : <div>Sign Up</div>}
            </Button>
            <p className="text-sm text-neutral-600">
              By signing up, you agree to the{" "}
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
              Already have an account?{" "}
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

export default SignUpForm;
