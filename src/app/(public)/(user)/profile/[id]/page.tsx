import ListingCard from "@/app/(public)/components/listing-card";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { GetListingsByUserID } from "@/services/listings.services";
import { GetUserById } from "@/services/user.services";
import { IListingCard } from "@/types";
import { getTimeAgo } from "@/utils/time";
import Avatar from "boring-avatars";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

async function ProfilePage({ params }: Props) {
  const [listings, user, session] = await Promise.all([
    GetListingsByUserID(params.id),
    GetUserById(params.id),
    getServerSession(authOptions),
  ]);

  const userListings = listings?.data || null;
  const userData = user?.data || null;

  if (userListings === null || userData === null) {
    return (
      <div className="min-h-screen col-span-4 flex justify-center items-center">
        <div className="text-center">
          <h3>MRKT</h3>
          <p className="text-neutral-500">
            An error occured while loading this seller&apos; profile. Please try
            again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen px-6">
      <div>
        <div className="py-8">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div>
              <Avatar
                size={200}
                name={userData?.first_name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div>
              <h3>
                {userData?.first_name} {userData?.last_name}
              </h3>
              <p className="text-neutral-500">
                {userData?.email} | {userData?.phone_number}
              </p>
              {userData?.created_at && (
                <p className="text-neutral-500">
                  Joined {getTimeAgo(userData.created_at)}
                </p>
              )}
              {/* <Button size={"sm"} className="mt-3">
                Edit Profile
              </Button> */}
            </div>
          </div>
        </div>
        <br />
        <div className="py-8">
          <div>
            <h4>Listings</h4>
          </div>
          <div className="items-center py-8">
            {userListings && userListings.length === 0 ? (
              <div className="h-[40vh] col-span-4 flex justify-center items-center">
                <div className="text-center">
                  <h3>MRKT</h3>
                  <p className="text-neutral-500">No listings avaliable</p>
                  {session?.user.id === userData?.id && (
                    <Link href={`/new`}>
                      <Button
                        variant={"default"}
                        size={"sm"}
                        className="items-center gap-2"
                      >
                        Sell Something
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
                {userListings &&
                  userListings.map((listing: IListingCard) => {
                    return (
                      <ListingCard
                        key={listing.id}
                        id={listing.id}
                        title={listing.title}
                        img_url={listing.image_url}
                        price={listing.price}
                        is_featured={listing.is_featured}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
