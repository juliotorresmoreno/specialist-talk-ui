import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/models";

const initialState: AuthState = {
  session: null
};

export const counterSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.session = action.payload;
    },
    logout(state) {
      state.session = null;
    },
  },
});

export default counterSlice;
