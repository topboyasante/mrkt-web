import { GetListing } from "@/services/listings.services";
import ListingDetails from "./components/listing-details";

type Props = {
  params: {
    id: string;
  };
};

async function ListingDetailsPage({ params }: Props) {
  const [listing] = await Promise.all([GetListing(params.id)]);

  return <ListingDetails listing={listing.data} author={listing.data.user} />;
}

export default ListingDetailsPage;
