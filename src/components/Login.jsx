import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/appSlice";
import { removeFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import { Api_Url } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("dev@gmail.com");
  const [password, setPassword] = useState("Dev123@yadav");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        Api_Url + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      dispatch(removeFeed());
      navigate("/");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            value={emailId}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your email"
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-500 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
