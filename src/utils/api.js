import axios from "axios";
import { Api_Url, DEFAULT_AVATAR } from "./constants";

export const api = axios.create({
  baseURL: Api_Url,
  withCredentials: true,
});

export const getErrorMessage = (err, fallback = "Something went wrong") => {
  if (!err?.response) {
    return "Cannot reach the server. Is the backend running?";
  }
  const data = err.response.data;
  if (typeof data === "string" && data && !data.trim().startsWith("<")) {
    return data;
  }
  return data?.error || data?.message || fallback;
};

// Uploaded images are stored as "/upload/<file>" on the backend, while the
// default avatar and older profiles use a full URL.
export const getImageUrl = (profile) => {
  if (!profile) return DEFAULT_AVATAR;
  if (/^(https?:|blob:|data:)/.test(profile)) return profile;
  return Api_Url + profile;
};

export const handleImageError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = DEFAULT_AVATAR;
};
