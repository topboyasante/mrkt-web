import { GetListing } from "@/services/listings.services";
import ListingDetails from "./components/listing-details";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

async function ListingDetailsPage({ params }: Props) {
  const [listing] = await Promise.all([GetListing(params.id)]);

  if (listing === null) return notFound();

  return <ListingDetails listing={listing} />;
}

export default ListingDetailsPage;
