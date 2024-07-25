"use server";

import { UserResponse } from "@/types";

async function GetUserById(id: string): Promise<UserResponse | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/user/${id}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

type ChangePasswordParams = {
  prev_password: string;
  new_password: string;
};

async function ChangePassword(data: ChangePasswordParams, accessToken: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/user/change-password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(
        `Failed to change password: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}

export { GetUserById, ChangePassword };
