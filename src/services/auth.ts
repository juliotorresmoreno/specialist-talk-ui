import { FetchError } from "../types/errors";
import { Session } from "../types/models";

export type SignInPayload = {
  email: string;
  password: string;
};

export async function signIn(payload: SignInPayload): Promise<Session> {
  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new FetchError({
      message: "Failed to sign in",
      cause: await response.json(),
    });
  }

  return response.json();
}

export type SignUpPayload = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
};

export async function signUp(payload: SignInPayload): Promise<Session> {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new FetchError({
      message: "Failed to sign in",
      cause: await response.json(),
    });
  }

  return response.json();
}
