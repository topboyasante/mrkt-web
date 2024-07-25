import { GetFeaturedListings, GetListings } from "@/services/listings.services";
import React, { Suspense } from "react";
import FeaturedListings from "./components/featured-listings";
import Listings from "./components/listings";
import SearchBar from "@/components/ui/search-bar";

async function Home() {
  const [listings, featuredListings] = await Promise.all([
    GetListings(),
    GetFeaturedListings(),
  ]);


  return (
    <div>
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-screen-xl mx-auto px-6 py-20 flex flex-col justify-center items-center text-center">
          <h1>Welcome to the MRKT.</h1>
          <p className="text-neutral-500 mt-2">What do you need?</p>
          <br />
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-6">
        <br />
        <FeaturedListings data={featuredListings?.data} />
        <br />
        <Listings data={listings?.data} />
      </div>
    </div>
  );
}

export default Home;
