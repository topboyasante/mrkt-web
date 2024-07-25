import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UpdateListingForm from "./components/update-listing";
import { GetListing } from "@/services/listings.services";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

async function EditListingPage({ params }: Props) {
  const [session, listing] = await Promise.all([
    await getServerSession(authOptions),
    GetListing(params.id),
  ]);

  if (!listing) return notFound()

  return (
    <div className="max-w-screen-md mx-auto px-6">
      <UpdateListingForm
        user_id={session?.user.id as string}
        listing_id={listing.data.id}
        title={listing.data.title}
        description={listing.data.description}
        price={listing.data.price}
        address={listing.data.address}
        city={listing.data.city}
        country={listing.data.country}
        image={listing.data.image_url}
      />
    </div>
  );
}

export default EditListingPage;
