import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Api_Url } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const getFeed = async () => {
      if (!feed?.data || feed?.data.length === 0) {
        try {
          const res = await axios.get(Api_Url + "/user/feed", {
            withCredentials: true,
          });
          console.log("Feed Data:", res.data);
          dispatch(addFeed(res?.data));
        } catch (err) {
          console.error(err.message);
        }
      }
    };

    getFeed();
  }, []);

  const handleNext = () => {
    if (feed?.data && currentIndex < feed.data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!feed?.data || feed.data.length === 0) {
    return <h1 className="flex justify-center my-10">No new users found!</h1>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <UserCard
        user={feed.data[currentIndex]}
        handleNext={handleNext}
      />
    </div>
  );
};

export default Feed;
