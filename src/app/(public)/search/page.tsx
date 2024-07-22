import { SearchListing } from "@/services/listings.services";
import { IListingCard } from "@/types";
import React from "react";
import ListingCard from "../components/listing-card";
import SearchBar from "@/components/ui/search-bar";

type Props = {
  searchParams: {
    query: string;
  };
};

async function SearchPage({ searchParams }: Props) {
  const listing = await SearchListing(searchParams.query);
  return (
    <div>
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-screen-xl mx-auto px-6 py-20 flex flex-col justify-center items-center">
          <h1>Welcome to the MRKT.</h1>
          <p className="text-neutral-500 mt-2">What do you need?</p>
          <br />
          <SearchBar />
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="py-16">
          <h3>Search Results for &quot;{searchParams.query}&quot;</h3>
        </div>
        <div>
          <div className="items-center py-8">
            {listing.data.length === 0 ? (
              <div className="h-[40vh] col-span-4 flex justify-center items-center">
                <div className="text-center">
                  <h3>MRKT</h3>
                  <p className="text-neutral-500">No listings avaliable</p>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
                {listing.data.map((listing: IListingCard) => {
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

export default SearchPage;
