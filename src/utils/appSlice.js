import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
    updateProfileImage: (state, action) => {
      if (state) {
        return {
          ...state,
          profileImageUrl: action.payload,
        };
      }
      return state;
    },
  },
});

export const { addUser, removeUser, updateProfileImage } = userSlice.actions;
export default userSlice.reducer;
