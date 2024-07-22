"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";

function BackButton() {
  const router = useRouter();
  return (
    <div className="my-2">
      <Button variant={`outline`} onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
}

export default BackButton;
