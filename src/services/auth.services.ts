"use server";

import { JWT } from "next-auth/jwt";

type SignUpParams = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
};

async function SignUp(values: SignUpParams) {
  await fetch(`${process.env.API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`${errorData.error}`);
      }
      return res;
    })
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
}

async function ActivateAccount(email: string, auth_token: number) {
  await fetch(`${process.env.API_URL}/auth/activate-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, auth_token }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`${errorData.error}`);
      }
      return res;
    })
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
}

async function ResendActivationCode(email: string) {
  await fetch(`${process.env.API_URL}/auth/resend-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`${errorData.error}`);
      }
      return res;
    })
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
}

async function RefreshAccessToken(token: JWT) {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: token.refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const data = await response.json();

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: data.expires_in,
      refreshToken: data.refresh_token || token.refreshToken,
    };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

async function ForgotPassword(email: string) {
  await fetch(`${process.env.API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`${errorData.error}`);
      }
      return res;
    })
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
}

type ResetPasswordParams = {
  email: string;
  new_password: string;
  auth_token: number;
};

async function ResetPassword(values: ResetPasswordParams) {
  await fetch(`${process.env.API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`${errorData.error}`);
      }
      return res;
    })
    .catch((err) => {
      throw new Error(`${err.message}`);
    });
}

export {
  SignUp,
  ActivateAccount,
  RefreshAccessToken,
  ForgotPassword,
  ResetPassword,
  ResendActivationCode,
};
