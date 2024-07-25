"use client";
import { Product } from "@/types";
import ListingCard from "./listing-card";

type Props = {
  data: Product[] | undefined | null;
};

function FeaturedListings({ data }: Props) {
  if (data === undefined || null) {
    return (
      <div className="h-[40vh] col-span-4 flex justify-center items-center">
        <div className="text-center">
          <h3>MRKT</h3>
          <p className="text-neutral-500">An error occured while loading the listings. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h4>Featured</h4>
      </div>
      <div className="items-center py-8">
        {data && data.length === 0 ? (
          <div className="h-[40vh] col-span-4 flex justify-center items-center">
            <div className="text-center">
              <h3>MRKT</h3>
              <p className="text-neutral-500">No listings available</p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {data &&
              data.map((listing) => (
                <ListingCard
                  key={listing.id}
                  id={listing.id}
                  title={listing.title}
                  img_url={listing.image_url}
                  price={listing.price}
                  is_featured={listing.is_featured}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedListings;
