import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth";
import messagesSlice from "./features/messages";
import chatsSlice from "./features/chats";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.error(err);
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: combineReducers({
    auth: authSlice.reducer,
    messages: messagesSlice.reducer,
    chats: chatsSlice.reducer,
  }),
  preloadedState: persistedState,
});

store.subscribe(() => saveState(store.getState()));

export type RootState = ReturnType<typeof store.getState>;

export default store;
