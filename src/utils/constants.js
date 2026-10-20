// Backend URL. Set VITE_REACT_APP_API_URL in .env (see .env.example).
export const Api_Url = (
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const DEFAULT_AVATAR = "/download.png";
