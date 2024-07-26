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
import { notFound } from "next/navigation";

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

  if (listings?.data == null || user?.data == null) {
    return notFound();
  }

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen px-6">
      <div>
        <div className="py-8">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div>
              <Avatar
                size={200}
                name={user.data.first_name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div>
              <h3>
                {user.data.first_name} {user.data.last_name}
              </h3>
              <p className="text-neutral-500">
                {user.data.email} | {user.data.phone_number}
              </p>
              {user.data.created_at && (
                <p className="text-neutral-500">
                  Joined {getTimeAgo(user.data.created_at)}
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
            {listings?.data && listings?.data.length === 0 ? (
              <div className="h-[40vh] col-span-4 flex justify-center items-center">
                <div className="text-center">
                  <h3>MRKT</h3>
                  <p className="text-neutral-500">No listings avaliable</p>
                  {session?.user.id === user.data.id && (
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
                {listings?.data &&
                  listings?.data.map((listing: IListingCard) => {
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
