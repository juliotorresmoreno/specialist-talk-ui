import { FetchError } from "../types/errors";
import { Comment, Post } from "../types/models";

export type SignInPayload = {
  email: string;
  password: string;
};

export async function findAll(): Promise<Post[]> {
  const response = await fetch("/api/posts", {
    method: "GET",
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to fetch posts",
      cause: await response.json(),
    });
  }

  return response.json();
}

export async function findOne(id: number): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to fetch post",
      cause: await response.json(),
    });
  }

  return response.json();
}

export async function create(data: { content: string }): Promise<void> {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to create post",
      cause: await response.json(),
    });
  }
}

export async function update(
  id: number,
  data: { content: string }
): Promise<void> {
  const response = await fetch(`/api/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to update post",
      cause: await response.json(),
    });
  }
}

export async function like(postId: number): Promise<void> {
  const response = await fetch(`/api/posts/${postId}/like`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to like post",
      cause: await response.json(),
    });
  }
}

export async function unlike(postId: number): Promise<void> {
  const response = await fetch(`/api/posts/${postId}/like`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to unlike post",
      cause: await response.json(),
    });
  }
}

export async function comments(postId: number): Promise<Comment[]> {
  const response = await fetch(`/api/posts/${postId}/comments`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to fetch comments",
      cause: await response.json(),
    });
  }

  return response.json();
}

export async function comment(
  postId: number,
  data: { content: string }
): Promise<void> {
  const response = await fetch(`/api/posts/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new FetchError({
      message: "failed to fetch comments",
      cause: await response.json(),
    });
  }
}
