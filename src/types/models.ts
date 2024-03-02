export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  bio: string;
  image: string;
};

export type Session = {
  token: string;
  user: User;
};

export type AuthState = {
  session: Session | null;
};
