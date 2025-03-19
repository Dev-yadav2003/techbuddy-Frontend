import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/appSlice";
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
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="card bg-slate-300 text-primary-content w-80 flex">
        <div className="card-body">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className=" text-slate-700 text-lg font-bold opacity-100">
                Enter your Email
              </span>
            </div>
            <input
              type="text"
              value={emailId}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className=" text-slate-700 text-lg font-bold opacity-100">
                Enter your password
              </span>
            </div>
            <input
              type="text"
              value={password}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e?.target?.value)}
            />
          </label>
          <p className=" text-red-600">{error}</p>

          <div className="card-actions">
            <button
              className="btn w-18 "
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
