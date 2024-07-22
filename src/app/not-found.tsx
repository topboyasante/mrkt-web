import BackButton from "@/components/ui/back-button";
import Image from "next/image";

function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <Image
        src={`/MRKT.png`}
        alt="logo"
        width={500}
        height={500}
        className="w-20 h-20 rounded-md"
      />
      <div className="flex flex-col justify-center items-center">
        <h3>The page you&apos;re looking for does not exist.</h3>
        <BackButton />
      </div>
    </div>
  );
}

export default NotFound;
