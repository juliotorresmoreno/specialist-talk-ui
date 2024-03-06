import { PropsWithChildren, useEffect, useState } from "react";
import * as authService from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../features/authSlice";
import { RootState } from "../store";

interface SessionProps extends PropsWithChildren<{}> {}

export function Session(props: SessionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const session = useSelector((state: RootState) => state.auth.session);
  const dispatch = useDispatch();

  async function getData() {
    try {
      if (!session) return;
      await authService.session();
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
