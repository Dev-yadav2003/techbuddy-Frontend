import axios from "axios";
import React, { useEffect } from "react";
import { Api_Url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
const Connection = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const handleConnections = async () => {
    try {
      const res = await axios.get(Api_Url + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    handleConnections();
  }, []);

  if (!connection) return;
  if (connection.length === 0) {
    return <p className="text-center text-3xl">No Connection Found</p>;
  }
  return (
    <div className=" flex justify-center flex-col items-center">
      <h1 className=" text-3xl text-zinc-800 text-center font-bold mb-4">
        Connections
      </h1>
      {connection.map((connection) => (
        <div
          key={connection._id}
          className="flex items-center justify-between mb-6 border-4 border-blue-600
                   shadow-lg rounded-lg p-4 w-1/2 bg-white transition-transform transform hover:scale-105"
        >
          <div className="flex items-center space-x-4">
            <img
              className="w-24 h-24 rounded-full border-2  "
              alt="photo"
              src={connection.profile}
            />
            <div className=" flex flex-col w-3/4">
              <span className="text-lg font-semibold text-gray-700">
                {connection.firstName}
              </span>
              <div>
                <span className="text-lg font-semibold text-gray-700">
                  {connection.age}
                </span>
                <span className="text-lg font-semibold text-gray-700">
                  {connection.gender}
                </span>
              </div>
              <span className="text-lg font-semibold text-gray-700">
                {connection.about}
              </span>
              <span className="text-lg font-semibold text-gray-700">
                {connection.skills}
              </span>
              <span className="text-lg font-semibold text-gray-700">
                {connection.age}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connection;
