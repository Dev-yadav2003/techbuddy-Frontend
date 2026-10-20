import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer, { removeUser } from "./appSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestsReducer from "./requestSlice";

const appReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connection: connectionReducer,
  requests: requestsReducer,
});

// Logging out clears everything, so the next user never sees stale data.
const rootReducer = (state, action) =>
  appReducer(action.type === removeUser.type ? undefined : state, action);

const createStore = configureStore({
  reducer: rootReducer,
});
export default createStore;
