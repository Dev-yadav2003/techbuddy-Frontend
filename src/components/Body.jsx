import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { Api_Url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/appSlice";

const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(Api_Url + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
      <div className="bg-blue-900 text-white shadow-md">
        <Navbar />
      </div>
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
