import { FetchError } from "../types/errors";
import { Chat, Message } from "../types/models";

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

export async function createMessage(
  chatId: number,
  content: string
): Promise<Chat> {
  const response = await fetch(`/api/chats/${chatId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to create chat message",
      cause: await response.json(),
    });
  }

  return response.json();
}

export async function getMessages(chatId: number): Promise<Message[]> {
  const response = await fetch(`/api/chats/${chatId}/messages`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to fetch chat messages",
      cause: await response.json(),
    });
  }

  return response.json();
}
