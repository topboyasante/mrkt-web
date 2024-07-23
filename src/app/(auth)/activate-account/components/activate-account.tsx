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
import {
  ActivateAccount,
  ResendActivationCode,
} from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  auth_token: z.coerce.number().min(1000, {
    message: "A valid token must be four digits.",
  }),
});

type Props = {
  email: string;
};

function ActivateAccountForm({ ...props }: Props) {
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [canSendCode, setCanSendCode] = useState(true);
  const [overlay, setOverlay] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!canSendCode) {
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      setTimer(60);
    }
    return () => clearInterval(interval);
  }, [canSendCode]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      auth_token: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);
    await ActivateAccount(props.email, values.auth_token)
      .then(() => {
        setIsSubmittingForm(false);
        router.push(`/sign-in`);
        toast.success("Your account has been activated! 🎉");
      })
      .catch((err) => {
        toast.error(`${err}`);
        setIsSubmittingForm(false);
      });
  }

  async function handleResendActivationCode(email: string) {
    setOverlay(true);
    await ResendActivationCode(email)
      .then(() => {
        setCanSendCode(false);
        setOverlay(false);
        toast.success("We've sent the code to your email.");
        setTimeout(() => setCanSendCode(true), 60000);
      })
      .catch((err) => {
        setOverlay(false);
        toast.error(`${err}`);
      });
  }

  return (
    <>
      {overlay && (
        <div className="w-screen h-screen fixed top-0 z-[60] bg-black/80 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <div className="w-full bg-white px-5 py-8 rounded-xl">
        <div>
          MRKT
          <div className="my-5">
            <h5 className="text-primary">Activate your Account</h5>
            <p className="text-neutral-500">
              Enter the code sent to {props.email}
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="auth_token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary">
                      Activation Code
                    </FormLabel>
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
              <Button
                type="submit"
                className="w-full"
                size={"sm"}
                disabled={isSubmittingForm}
              >
                {isSubmittingForm ? <Loader /> : <div>Submit</div>}
              </Button>
              <div className="my-3 flex items-center gap-1">
                <p>Didn't receive the code? </p>
                <Button
                  disabled={!canSendCode}
                  type="button"
                  variant={"link"}
                  className="p-0 underline"
                  onClick={() => handleResendActivationCode(props.email)}
                >
                  {canSendCode ? "Click Here" : `Please wait... ${timer}s`}
                </Button>
              </div>
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
                Don't have an account?{" "}
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
    </>
  );
}

export default ActivateAccountForm;
