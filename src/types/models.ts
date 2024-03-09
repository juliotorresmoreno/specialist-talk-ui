export type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  photo_url: string;
  phone?: string;
  business?: string;
  position_name?: string;
  url?: string;
};

export type Session = User;

export type AuthState = {
  session: Session | null;
};

export type MessagesState = {
  [key: string]: Message[];
};

export interface Author {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  business: string;
  position_name: string;
  creation_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  content: string;
  author_id: number;
  author: Author;
  likes: number;
  liked: boolean;
  comments: number;
  creation_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  content: string;
  author_id: number;
  author: Author;
  creation_at: string;
  updated_at: string;
}

export type Chat = {
  id: number;
  name: string;
  owner_id: number;
  owner: User;
  code: string;
  active: boolean;
  creation_at: string;
  updated_at: string;
};

export type Message = {
  id: number;
  chat_id: number;
  chat: Chat;
  user_id: number;
  user: User;
  content: string;
  creation_at: string;
  updated_at: string;
};
