import { createSlice } from "@reduxjs/toolkit";
import { Chat, ChatsState } from "../types/models";

const initialState: ChatsState = {
  items: [],
};

type SetAction = { type: string; payload: Chat[] };

export const chatsSlice = createSlice({
  name: "chats",
  initialState: initialState,
  reducers: {
    set(state, action: SetAction) {
      state.items = action.payload;
    },
  },
});

export default chatsSlice;
