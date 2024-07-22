"use client";
import React from "react";
import CreateListingForm from "./components/create-listing";
import { useSession } from "next-auth/react";

function NewListingPage() {
  const session = useSession();
  return (
    <div className="max-w-screen-md mx-auto px-6">
      <CreateListingForm user_id={session.data?.user.id as string} />
    </div>
  );
}

export default NewListingPage;
