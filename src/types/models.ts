export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  photo_url: string;
};

export type Session = User;

export type AuthState = {
  session: Session | null;
};
