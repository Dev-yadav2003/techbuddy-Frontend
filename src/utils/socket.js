import { io } from "socket.io-client";
import { Api_Url } from "./constants";

export const createSocketConnection = () => {
  return io(Api_Url, {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });
};
