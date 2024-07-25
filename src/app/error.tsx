"use client";
import BackButton from "@/components/ui/back-button";
import Image from "next/image";

function Error() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <Image
        src={`/MRKT.png`}
        alt="logo"
        width={500}
        height={500}
        className="w-20 h-20 rounded-md"
      />
      <div className="flex flex-col justify-center items-center text-center">
        <h3>Ow, Snap!</h3>
        <p className="text-neutral-500">
          You&apos;re here because something went wrong. Would you like to head
          back to where you came from?
        </p>
        <BackButton />
      </div>
    </div>
  );
}

export default Error;
