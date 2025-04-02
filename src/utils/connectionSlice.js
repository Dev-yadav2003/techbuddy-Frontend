import { createSlice } from "@reduxjs/toolkit";

const connections = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
  },
});

export const { addConnection } = connections.actions;
export default connections.reducer;
