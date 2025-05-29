import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { Api_Url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/appSlice";
import Footer from "./Footer";

const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${Api_Url}/profile/view`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const userData = res.data;

      if (userData && userData._id) {
        dispatch(addUser(userData));
      } else {
        document.cookie =
          "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        navigate("/login");
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      if (error.response?.status === 401) {
        document.cookie =
          "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        navigate("/login");
      } else {
        console.error("Failed to fetch profile:", error.message);
      }
    }
  };

  useEffect(() => {
    if (!user || !user._id) {
      fetchProfile();
    }
  }, []);

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
