import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import messagesSlice from "../features/messages";

export interface EventsProps extends PropsWithChildren {}

export function Events(props: EventsProps) {
  const session = useSelector((state: RootState) => state.auth.session);
  const dispatch = useDispatch();
  let eventSource: EventSource;

  function connect() {
    eventSource = new EventSource("/events");

    eventSource.addEventListener("open", () => {
      console.log("connection opened");
    });
    eventSource.addEventListener("message", (event) => {
      switch (event.type) {
        case "message":
          const data = JSON.parse(event.data);
          dispatch(messagesSlice.actions.addMessage(data));
          break;
      }
    });

    eventSource.addEventListener("error", () => {
      eventSource.close();
      setTimeout(connect, 1000);
    });
  }

  useEffect(() => {
    if (session) {
      connect();

      return () => eventSource.close();
    }
  }, [session]);

  return props.children;
}
