"use server";

import { BatchResponse, SingleResponse } from "@/types";

async function CreateListing(data: FormData, accessToken: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    });

    if (!res.ok) {
      throw new Error(
        `Failed to create listing: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
}

async function GetListings(): Promise<BatchResponse | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/listings`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

async function GetListingsByUserID(id: string): Promise<BatchResponse | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/user/${id}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

async function SearchListing(query: string): Promise<BatchResponse | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/search/${query}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

async function GetListing(id: string): Promise<SingleResponse | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/${id}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

async function GetFeaturedListings(): Promise<BatchResponse | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/featured`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

async function UpdateListing(id: string, data: FormData, accessToken: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: data,
    });

    if (!res.ok) {
      throw new Error(
        `Failed to update listing: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  }
}

async function DeleteListing(id: string, accessToken: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to delete listing: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw error;
  }
}

export {
  GetListing,
  GetListings,
  GetFeaturedListings,
  CreateListing,
  GetListingsByUserID,
  DeleteListing,
  UpdateListing,
  SearchListing,
};
