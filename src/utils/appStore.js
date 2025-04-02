import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./appSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";

const createStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
  },
});
export default createStore;
