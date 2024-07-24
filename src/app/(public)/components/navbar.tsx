"use client";
import { Button } from "@/components/ui/button";
import UserProfileDropdown from "./profile-popup";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Navbar() {
  const session = useSession();

  return (
    <nav className="w-full h-20 z-[40] sticky top-0 bg-primary text-primary-foreground">
      <div className="max-w-screen-xl mx-auto h-full flex justify-between items-center px-6">
        <Link href={`/`}>MRKT</Link>
        <div className="flex items-center gap-5">
          {session.data?.user ? (
            <div className="flex items-center gap-5">
              <Link href={`/new`}>
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  className="rounded-full items-center gap-2"
                >
                  Start Selling
                </Button>
              </Link>
              <UserProfileDropdown />
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              <Link href={`/sign-in`} className="hover:underline">
                Log In
              </Link>
              <Link href={`/sign-up`}>
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  className="rounded-full items-center gap-2"
                >
                  Start Selling
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
