import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { Api_Url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "../utils/appSlice";
import Footer from "./Footer";

const Body = () => {
  const user = useSelector(selectCurrentUser);
  const status = useSelector(selectAppStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    dispatch(setLoading());
    try {
      const { data } = await axios.get(`${Api_Url}/profile/view`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (data?.success) {
        const userWithImage = {
          ...data.user,
          profileImageUrl: data.user.profileImage
            ? data.user.profileImage.startsWith("http")
              ? data.user.profileImage
              : `${Api_Url}/uploads/${data.user.profileImage}`
            : "/default-profile.jpg",
        };
        dispatch(setUser(userWithImage));
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      dispatch(setError(error.message));

      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    dispatch(clearUser());
    navigate("/login");
  };

  useEffect(() => {
    if (!user && status !== "loading") {
      fetchProfile();
    }
  }, [user, status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
      <main className="flex-grow container mx-auto px-4 md:px-8 lg:px-16 py-6">
        <Outlet />
      </main>
      <div className="bg-blue-400 text-white shadow-md">
        <Footer />
      </div>
    </div>
  );
};

export default Body;
