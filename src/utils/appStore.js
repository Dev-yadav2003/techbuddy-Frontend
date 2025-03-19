import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./appSlice";
import feedReducer from "./feedSlice";

const createStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});
export default createStore;
