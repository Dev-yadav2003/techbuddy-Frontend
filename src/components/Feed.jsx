import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Api_Url } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed !== null) return;
    try {
      const res = await axios.get(Api_Url + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) getFeed();
  }, [user]);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold my-10">No new users found!</h1>
        <div>
          <img
            className=" w-64 h-64"
            alt="no user image"
            src="public\noUserFound.webp"
          />
        </div>
      </div>
    );
  }
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
