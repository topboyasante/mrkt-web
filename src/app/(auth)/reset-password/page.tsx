import React from "react";
import ResetPasswordForm from "./components/reset-password";
import { notFound } from "next/navigation";

type Props = {
  searchParams?: {
    email?: string;
  };
};

async function ResetPasswordPage({ searchParams }: Props) {
  if (!searchParams?.email) {
    return notFound();
  }
  return (
    <div className="w-full h-full bg-gradient-to-t  from-[#ffffff] to-primary">
      <div className="max-w-md mx-auto min-h-screen flex justify-center items-center p-3">
        <ResetPasswordForm reset_email={searchParams.email} />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
