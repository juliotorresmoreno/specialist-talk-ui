import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { redirect } from "react-router-dom";

interface AuthenticatedProps {
  children: ReactNode;
}

export function Authenticated({ children }: AuthenticatedProps) {
  const { session } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!session) {
      redirect("/sign-in");
    }
  }, [session]);

  return children;
}
