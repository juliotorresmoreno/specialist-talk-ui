import { FetchError } from "../types/errors";
import { User } from "../types/models";

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
