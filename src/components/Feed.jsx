import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api, getErrorMessage } from "../utils/api";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Loader from "./Loader";
import EmptyState from "./EmptyState";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // True once the backend says there is nobody left to show.
  const [exhausted, setExhausted] = useState(false);

  const getFeed = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/user/feed");
      const users = res.data?.data || [];
      setExhausted(users.length === 0);
      dispatch(addFeed(users));
    } catch (err) {
      setError(getErrorMessage(err, "Could not load the feed"));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Load the first page, and the next one whenever the current page is used up.
  useEffect(() => {
    if (loading || error) return;
    if (feed === null || (feed.length === 0 && !exhausted)) getFeed();
  }, [feed, exhausted, loading, error, getFeed]);

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <div role="alert" className="alert alert-error max-w-md">
          <span>{error}</span>
        </div>
        <button className="btn btn-primary" onClick={getFeed}>
          Try again
        </button>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    if (loading || !exhausted) return <Loader label="Finding developers..." />;
    return (
      <EmptyState
        image="/noUserFound.webp"
        title="You're all caught up!"
        text="There are no new developers to show right now. Check back later."
      >
        <button className="btn btn-primary btn-outline" onClick={getFeed}>
          Refresh
        </button>
      </EmptyState>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">Discover developers</h1>
        <p className="text-base-content/60 mt-1">
          Swipe right or tap <b>Interested</b> to connect, swipe left to skip.
        </p>
      </div>
      <UserCard key={feed[0]._id} user={feed[0]} />
    </div>
  );
};

export default Feed;
