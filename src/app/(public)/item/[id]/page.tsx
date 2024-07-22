import { GetListing, GetListingAuthor } from "@/services/listings.services";
import ListingDetails from "./components/listing-details";

type Props = {
  params: {
    id: string;
  };
};

async function ListingDetailsPage({ params }: Props) {
  const [listing, author] = await Promise.all([
    GetListing(params.id),
    GetListingAuthor(params.id),
  ]);

  return (
    <ListingDetails listing={listing.data} author={author}/>
  );
}

export default ListingDetailsPage;
