import React from "react";
import { notFound } from "next/navigation";
import ActivateAccount from "./components/activate-account";

type Props = {
  searchParams?: {
    email?: string;
  };
};

function ActivateAccountPage({ searchParams }: Props) {
  if (!searchParams?.email) {
    return notFound();
  }
  return (
    <div className="w-full h-full bg-gradient-to-t from-[#ffffff] to-primary">
      <div className="max-w-md mx-auto min-h-screen flex justify-center items-center p-3">
        <ActivateAccount email={searchParams.email} />
      </div>
    </div>
  );
}

export default ActivateAccountPage;
