"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { DeleteListing } from "@/services/listings.services";
import { SingleResponse } from "@/types";
import { getTimeAgo } from "@/utils/time";
import Avatar from "boring-avatars";
import DOMPurify from "isomorphic-dompurify";
import { Clock, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

type Props = {
  listing: SingleResponse | null | undefined;
};

function ListingDetails({ listing }: Props) {
  const [overlay, setOverlay] = useState(false);
  const router = useRouter();
  const session = useSession();

  async function handleDeleteListing() {
    if (!listing?.data?.id || !session.data?.user.access_token) return;

    try {
      setOverlay(true);
      await DeleteListing(listing.data.id, session.data.user.access_token);
      toast("Listing deleted successfully!");
      router.push("/");
    } catch (error) {
      toast("Error deleting listing.");
      console.error("Error deleting listing:", error);
    } finally {
      setOverlay(false);
    }
  }

  if (!listing) {
    return (
      <div className="min-h-screen col-span-4 flex justify-center items-center">
        <div className="text-center">
          <h3>MRKT</h3>
          <p className="text-neutral-500">
            An error occured while loading this listing. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const { data } = listing;
  const {
    image_url,
    title,
    address,
    city,
    country,
    created_at,
    description,
    price,
    user,
    user_id,
  } = data;

  return (
    <>
      {overlay && (
        <div className="w-screen h-screen fixed top-0 z-[60] bg-black/80 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="py-6 grid grid-cols-6 gap-5">
          {/* Left */}
          <div className="col-span-6 lg:col-span-4">
            <div className="relative">
              <Image
                src={image_url || "/default-image.jpg"} // Fallback image if undefined
                alt={title || "Listing Image"}
                width={1920}
                height={720}
                className="w-full rounded-md h-[500px] lg:h-[650px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div>
            </div>
            <br />
            <div className="shadow p-5 rounded-md">
              <h3>{title || "No Title"}</h3>
              <div className="text-sm flex items-center gap-2 my-2 text-neutral-500">
                <MapPin size={15} />
                <p>
                  {address || "No Address"}, {city || "No City"},{" "}
                  {country || "No Country"}
                </p>
              </div>
              <p className="text-sm flex items-center gap-2 text-neutral-500">
                <Clock size={15} />
                <span>Posted {getTimeAgo(created_at)}</span>
              </p>
            </div>
            <br />
            <div className="shadow p-5 rounded-md">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(description || "No Description"),
                }}
              ></div>
            </div>
          </div>
          {/* Right */}
          <div className="col-span-6 lg:col-span-2">
            <div className="shadow p-5 rounded-md">
              <h3>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "GHS",
                }).format(price || 0)}
              </h3>
              <hr className="my-2" />
              <div>
                <h5>Contact Details</h5>
                <div className="my-3">
                  <div className="flex items-center gap-2">
                    <Avatar
                      size={45}
                      name={user?.first_name || "Unknown"}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                    <p>
                      {user?.first_name || "Unknown"}{" "}
                      {user?.last_name || "User"}
                    </p>
                  </div>
                </div>
                <Link href={`tel:${user?.phone_number || ""}`} target="_blank">
                  <Button className="w-full mb-2">
                    Call {user?.first_name || "Seller"}
                  </Button>
                </Link>
                <Link
                  href={`https://wa.me/${
                    user?.calling_code || "" + (user?.phone_number || "")
                  }?text=I'm%20interested%20in%20your%20${title || "listing"}`}
                  target="_blank"
                >
                  <Button className="w-full gap-2">
                    <SiWhatsapp /> Send a Message
                  </Button>
                </Link>
              </div>
            </div>
            <br />
            <div className="shadow p-5 rounded-md">
              <h5>Seller Profile</h5>
              <Link href={`/profile/${user?.id}`}>
                <Button className="w-full my-2">View Seller Profile</Button>
              </Link>
            </div>
            <br />
            <div className="shadow p-5 rounded-md">
              <h4>Safety Tips</h4>
              <ul className="list-disc ml-2">
                <li>Avoid unnecessary inspection fees</li>
                <li>Bring a friend along for viewings, if possible</li>
                <li>
                  Thoroughly inspect the property to ensure it meets your needs
                </li>
                <li>
                  Refrain from making advance payments if you can&apos;t move in
                  right away
                </li>
              </ul>
            </div>
            <br />
            {session?.data?.user.id === user_id && (
              <div className="shadow p-5 rounded-md">
                <div>
                  <p>This listing was created by you.</p>
                  <Link href={`/item/${listing.data.id}/edit`}>
                    <Button className="w-full my-2" variant={"outline"}>
                      Edit this Listing
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger className="w-full" asChild>
                      <Button className="w-full my-2" variant={"destructive"}>
                        Delete this Listing
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You are deleting this listing, and it cannot be
                          recovered.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            handleDeleteListing();
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingDetails;
