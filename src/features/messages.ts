import { createSlice } from "@reduxjs/toolkit";
import { Message, MessagesState } from "../types/models";

const initialState: MessagesState = {};

interface Action<T = any> {
  type: string;
  payload: T;
}

type AddMessagesAction = Action<{ chat_id: number; messages: Message[] }>;
type AddMessageAction = Action<Message>;

export const messagesSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    addMessages(state, action: AddMessagesAction) {
      state[action.payload.chat_id] = action.payload.messages;
    },
    addMessage(state, action: AddMessageAction) {
      if (!state[action.payload.chat_id]) {
        state[action.payload.chat_id] = [];
      }
      state[action.payload.chat_id].push(action.payload);
    },
  },
});

export default messagesSlice;
