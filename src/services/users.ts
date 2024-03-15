import { FetchError } from "../types/errors";
import { User } from "../types/models";

type UserPayload = Partial<
  Omit<User, "id" | "email" | "photo_url" | "username"> & {
    photo: string;
  }
>;

export async function updateMe(data: UserPayload): Promise<void> {
  const response = await fetch(`/api/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to fetch users",
      cause: await response.json(),
    });
  }
}

export async function findAll(q: string): Promise<User[]> {
  const response = await fetch(`/api/users?q=${encodeURIComponent(q)}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to fetch users",
      cause: await response.json(),
    });
  }

  return response.json();
}

export async function findOne(username: string): Promise<User> {
  const response = await fetch(`/api/users/${encodeURIComponent(username)}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to fetch user",
      cause: await response.json(),
    });
  }

  return response.json();
}
