import axios from "axios";
import React, { useEffect } from "react";
import { Api_Url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        Api_Url + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleRequsts = async () => {
    try {
      const res = await axios.get(Api_Url + "/user/request", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    handleRequsts();
  }, []);
  return (
    <div className="flex flex-col justify-between items-center px-4 py-6">
      <h1 className="text-2xl sm:text-3xl text-zinc-800 text-center font-bold mb-6">
        Requests
      </h1>

      {requests.map((request) => (
        <div
          key={request._id}
          className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 border-2 border-blue-600
                     shadow-md rounded-xl p-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white 
                     transition-transform transform hover:scale-105"
        >
          <img
            className="w-24 h-24 rounded-full border-2 mb-4 sm:mb-0 sm:mr-6"
            alt="profile"
            src={request.fromUserId.profile}
          />

          <div className="flex flex-col gap-2 text-center sm:text-left w-full">
            <span className="text-lg font-semibold text-gray-700">
              {request.fromUserId.firstName}
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-gray-600 text-sm">
              <span>{request.fromUserId.age} years</span>
              <span>{request.fromUserId.gender}</span>
            </div>

            <p className="text-sm text-gray-600">{request.fromUserId.about}</p>

            <div className="flex flex-wrap gap-2 mt-1 justify-center sm:justify-start">
              {request.fromUserId.skills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className=" flex flex-col gap-2">
            <button
              className="text-green-600 rounded-md font-bold border-green-500 border-2 p-1"
              onClick={() => reviewRequest("accepted", request._id)}
            >
              Accept
            </button>
            <button
              className="text-red-600 border-red-500 rounded-md border-2 p-1 font-bold"
              onClick={() => reviewRequest("rejected", request._id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
