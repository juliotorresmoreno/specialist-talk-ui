import { FetchError } from "../types/errors";
import { Chat } from "../types/models";

export async function create(userId: number): Promise<Chat> {
  const response = await fetch("/api/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, name: "-" }),
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to create chat",
      cause: await response.json(),
    });
  }

  return response.json();
}
