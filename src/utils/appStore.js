import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./appSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestsReducer from "./requestSlice";

const createStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    requests: requestsReducer,
  },
});
export default createStore;
