import React from "react";
import ListingCard from "./listing-card";
import { IListingCard } from "@/types";

type Props = {
  data: any;
};

function FeaturedListings({ data }: Props) {
  return (
    <div>
      <div>
        <h4>Featured</h4>
      </div>
      <div className="items-center py-8">
        {data.length === 0 ? (
          <div className="h-[40vh] col-span-4 flex justify-center items-center">
            <div className="text-center">
              <h3>MRKT</h3>
              <p className="text-neutral-500">No listings avaliable</p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
            {data.map((listing: IListingCard) => {
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
  );
}

export default FeaturedListings;
