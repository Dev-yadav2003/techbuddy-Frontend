import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
    clearUser: (state) => {
      state.user = null;
      state.status = "idle";
    },
    updateUserProfileImage: (state, action) => {
      if (state.user) {
        state.user.profileImage = action.payload;
        state.user.profileImageUrl = `${action.payload}?t=${Date.now()}`;
      }
    },
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const {
  setUser,
  clearUser,
  updateUserProfileImage,
  setLoading,
  setError,
} = appSlice.actions;

export const selectCurrentUser = (state) => state.app.user;
export const selectAppStatus = (state) => state.app.status;
export const selectAppError = (state) => state.app.error;

export default appSlice.reducer;
