import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/appSlice";
import { removeFeed } from "../utils/feedSlice";
import { Link, useNavigate } from "react-router-dom";
import { Api_Url } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");

      if (!emailId || !password) {
        setError("Email and password are required");
        return;
      }

      const response = await axios.post(
        `${Api_Url}/login`,
        { emailId, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        dispatch(addUser(response.data.user));
        dispatch(removeFeed());
        navigate("/");
      } else {
        setError(response.data.error || "Login failed");
      }
    } catch (err) {
      const backendError = err.response?.data?.error;
      const message =
        backendError ||
        (err.response?.status === 401
          ? "Invalid credentials"
          : "Login failed. Please try again.");
      setError(message);
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      setError("");

      if (!firstName || !lastName || !emailId || !password) {
        setError("All fields are required");
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }

      const response = await axios.post(
        `${Api_Url}/signUp`,
        { firstName, lastName, emailId, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        dispatch(addUser(response.data.user));
        dispatch(removeFeed());
        navigate("/profile");
      } else {
        setError(response.data.error || "Signup failed");
      }
    } catch (err) {
      const backendError = err.response?.data?.error;
      const message = backendError || "Signup failed. Please try again.";
      setError(message);
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {!isLogin && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}

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
          {!isLogin && (
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        <button
          onClick={isLogin ? handleLogin : handleSignUp}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              className="text-indigo-500 hover:underline cursor-pointer ml-1"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
