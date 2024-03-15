import { PropsWithChildren, useEffect, useState } from "react";
import * as authService from "../services/auth";
import { useDispatch } from "react-redux";
import authSlice from "../features/auth";

interface SessionProps extends PropsWithChildren<{}> {}

export function Session(props: SessionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  async function getData() {
    try {
      if (isLoaded) return;
      const session = await authService.session();
      dispatch(authSlice.actions.login(session));
    } catch (error) {
      dispatch(authSlice.actions.logout());
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    getData();
  });

  if (!isLoaded) return null;
  return props.children;
}
