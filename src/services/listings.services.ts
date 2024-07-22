"use server";

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

async function GetListings() {
  try {
    const res = await fetch(`${process.env.API_URL}/listings`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function GetListingsByUserID(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/user/${id}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function SearchListing(query: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/search/${query}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function GetListing(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/${id}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function GetListingAuthor(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/${id}/author`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function GetFeaturedListings() {
  try {
    const res = await fetch(`${process.env.API_URL}/listings/featured`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
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
  GetListingAuthor,
  CreateListing,
  GetListingsByUserID,
  DeleteListing,
  UpdateListing,
  SearchListing
};
